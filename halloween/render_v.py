#!/usr/bin/env python3
"""Render the 9:16 Halloween highlight from an EDL json.
usage: python3 render_v.py edl.json out_basename
Expects: src/<files>, assets/plates/v_*.jpg, assets/fog/fog_v.mp4, assets/fonts/, assets/music/
"""
import json, os, subprocess, sys, math, shlex
EDL = json.load(open(sys.argv[1])); OUT = sys.argv[2]
W, H, FPS = 1080, 1920, 30
os.makedirs('work', exist_ok=True); os.makedirs('out', exist_ok=True)
FONT_T = 'assets/fonts/Creepster-Regular.ttf'; FONT_S = 'assets/fonts/SpecialElite-Regular.ttf'
PLATES = {'v_mansion.jpg', 'v_forest.jpg', 'v_hall.jpg', 'v_door.jpg'}
ENC = ['-c:v', 'libx264', '-preset', 'medium', '-crf', '19', '-pix_fmt', 'yuv420p', '-r', str(FPS),
       '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-ac', '2']

def run(cmd):
    r = subprocess.run(cmd, stdin=subprocess.DEVNULL, capture_output=True, text=True)
    if r.returncode != 0:
        print('CMD FAILED:', ' '.join(shlex.quote(c) for c in cmd)); print(r.stderr[-4000:]); sys.exit(1)
    return r

def probe_dur(path):
    r = subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', path], capture_output=True, text=True)
    return float(r.stdout.strip() or 0)

# ---------- beat grid ----------
def beats_for(track, start):
    try:
        import librosa, numpy as np
        y, sr = librosa.load(track, sr=22050, offset=start, duration=150, mono=True)
        tempo, frames = librosa.beat.beat_track(y=y, sr=sr)
        t = librosa.frames_to_time(frames, sr=sr)
        tempo = float(tempo) if not hasattr(tempo, '__len__') else float(tempo[0])
        print(f'tempo {tempo:.1f} bpm, {len(t)} beats'); return list(map(float, t)), tempo
    except Exception as e:
        print('beat detection unavailable:', e); return [], 0.0

def esc(s):  # drawtext escaping
    return s.replace('\\', '\\\\').replace(':', '\\:').replace("'", "\\\\\\'").replace(',', '\\,').replace('%', '\\%')

# ---------- per-shot filter builders ----------
def crop_expr(crop, crop_x=None):
    # landscape -> 9:16 window by height; crop_x (0..1) centres the window on that fraction of the width
    cw = 'ih*9/16'
    if crop_x is not None:
        x = f'max(0,min(iw-{cw},iw*{float(crop_x):.4f}-{cw}/2))'
    else:
        x = {'left': '0', 'right': f'iw-{cw}', 'center': f'(iw-{cw})/2'}.get(crop or 'center', f'(iw-{cw})/2')
    return f'crop={cw}:ih:{x}:0'

def fit_chain(kind, src_is_landscape, crop, crop_x=None, crop_box=None, slow=1.0):
    # produce 2x oversampled 9:16 frame for zoompan (2160x3840); videos normalised to 30 fps first
    pre = (f"setpts={slow:.4f}*PTS," if slow > 1.001 else "") + (f"fps={FPS}," if kind == 'video' else "")
    if crop_box and kind == 'video':
        x0, y0, x1, y1 = crop_box
        pre += f"crop=iw*{x1-x0:.4f}:ih*{y1-y0:.4f}:iw*{x0:.4f}:ih*{y0:.4f},"
        src_is_landscape = False
    if src_is_landscape:
        return f"{pre}{crop_expr(crop, crop_x)},scale=2160:3840:flags=lanczos,setsar=1"
    return f"{pre}scale=2160:3840:force_original_aspect_ratio=increase:flags=lanczos,crop=2160:3840,setsar=1"

def move_chain(move, shake, nframes, is_video, focus=None, zoom=None):
    N = max(1, nframes); s = 10 * shake
    amp = float(zoom) if zoom is not None else (0.06 if is_video else 0.10)
    z = {'push': f'1+{amp}*on/{N}', 'pull': f'1+{amp}-{amp}*on/{N}', 'hold': '1.02',
         'pan_left': f'1+{amp}', 'pan_right': f'1+{amp}'}.get(move, f'1+{amp}*on/{N}')
    jx = f'+{s}*sin(on/3.1)+{s*0.6}*sin(on/7.3)' if shake else ''
    jy = f'+{s*0.8}*sin(on/4.3)+{s*0.5}*cos(on/9.1)' if shake else ''
    fx, fy = (focus or [0.5, 0.5])
    if move == 'pan_left': x = f'(iw-iw/zoom)*(1-on/{N}){jx}'
    elif move == 'pan_right': x = f'(iw-iw/zoom)*(on/{N}){jx}'
    else: x = f'iw*{fx:.4f}-(iw/zoom/2){jx}'
    y = f'ih*{fy:.4f}-(ih/zoom/2){jy}'
    # clamp so the window never leaves the picture (out-of-frame samples render as black edges)
    x = f'max(0,min(iw-iw/zoom,{x}))'; y = f'max(0,min(ih-ih/zoom,{y}))'
    return f"zoompan=z='{z}':x='{x}':y='{y}':d=1:s={W}x{H}:fps={FPS}"

GRADE = ("eq=contrast=1.12:brightness=-0.06:saturation=0.82,"
         "curves=all='0/0 0.12/0.05 0.5/0.45 1/0.90',"
         "selectivecolor=yellows='0 0 -0.28 0':neutrals='0 0 -0.08 0':whites='0 0 -0.10 0',"
         "colorbalance=rs=-0.06:gs=0.0:bs=0.10:rm=-0.06:gm=0.01:bm=0.05:rh=-0.02:gh=0.0:bh=0.03")
GRADE_PLATE = "eq=contrast=1.05:brightness=-0.02:saturation=0.95,curves=all='0/0 0.12/0.07 1/0.97'"

def fx_chain(shot, dur):
    fx = set(shot.get('fx', [])); tr = shot.get('transition_in', 'cut'); parts = []
    if 'flicker' in fx: parts.append("eq=brightness='0.014*sin(31*t)+0.010*sin(53*t)':eval=frame")
    if 'glitch' in fx or tr == 'glitch':
        parts.append("rgbashift=rh=10:bh=-10:enable='lt(t,0.22)'")
        parts.append("noise=alls=40:allf=t:enable='lt(t,0.22)'")
    parts.append("noise=alls=11:allf=t+u")
    parts.append("vignette=PI/4.6")
    if tr == 'flash':   # lightning on the cut: crushed-highlight cold strike, silhouettes stay legible
        parts.append("curves=all='0/0 0.30/0.88 1/1':enable='lt(t,0.10)'")
        parts.append("colorbalance=bs=0.18:bm=0.12:enable='lt(t,0.10)'")
    elif tr == 'fadeblack': parts.append("fade=t=in:st=0:d=0.6:color=black")
    elif tr == 'fadewhite': parts.append("fade=t=in:st=0:d=0.5:color=white")
    if 'flash' in fx and tr != 'flash':  # a lightning hit mid-shot
        t0 = max(0.3, dur * 0.45)
        parts.append(f"curves=all='0/0 0.35/0.86 1/1':enable='between(t,{t0:.2f},{t0+0.08:.2f})'")
        parts.append(f"colorbalance=bs=0.16:bm=0.10:enable='between(t,{t0:.2f},{t0+0.08:.2f})'")
        parts.append(f"curves=all='0/0 0.45/0.68 1/1':enable='between(t,{t0+0.14:.2f},{t0+0.20:.2f})'")
    return ','.join(parts)

def fit_lines(text, font, maxw=920, maxsize=230, minsize=80, prefer_single=False):
    from PIL import ImageFont
    words = text.split(); f = ImageFont.truetype(font, maxsize)
    if prefer_single and ImageFont.truetype(font, minsize).getlength(text) <= maxw:
        size = maxsize
        while size > minsize and ImageFont.truetype(font, size).getlength(text) > maxw: size -= 2
        return [text], size
    if f.getlength(text) <= maxw or len(words) == 1:
        lines = [text]
    else:
        best = None
        for k in range(1, len(words)):
            a, b = ' '.join(words[:k]), ' '.join(words[k:])
            m = max(f.getlength(a), f.getlength(b))
            if best is None or m < best[0]: best = (m, [a, b])
        lines = best[1]
    size = maxsize
    while size > minsize and max(ImageFont.truetype(font, size).getlength(l) for l in lines) > maxw: size -= 4
    return lines, size

def tfile(i, k, line):
    fp = f'work/txt_{i:03d}_{k}.txt'; open(fp, 'w').write(line); return fp

def text_chain(shot, dur, i=0):
    parts = []; cy = H // 2 - 140; bottom = cy
    if shot.get('text'):
        lines, size = fit_lines(shot['text'], FONT_T)
        lh = int(size * 1.02); top = cy - (lh * len(lines)) // 2
        for k, line in enumerate(lines):
            parts.append(f"drawtext=fontfile={FONT_T}:textfile={tfile(i, k, line)}:expansion=none:fontsize={size}:fontcolor=0xE8E0CC@0.97:"
                         f"x=(w-text_w)/2:y={top + k*lh}:alpha='min(1,max(0,(t-{0.6+0.25*k:.2f})/0.5))':"
                         f"shadowcolor=black@0.9:shadowx=0:shadowy=12")
        bottom = top + lh * len(lines)
    if shot.get('text2'):
        lines2, size2 = fit_lines(shot['text2'], FONT_S, maxw=940, maxsize=50, minsize=34, prefer_single=True)
        for k, line in enumerate(lines2):
            parts.append(f"drawtext=fontfile={FONT_S}:textfile={tfile(i, 10 + k, line)}:expansion=none:fontsize={size2}:fontcolor=0xC9B98A@0.94:"
                         f"x=(w-text_w)/2:y={bottom + 40 + k*int(size2*1.3)}:alpha='min(1,max(0,(t-1.3)/0.5))':"
                         f"shadowcolor=black@0.85:shadowx=0:shadowy=6")
    return ','.join(parts)

def render_shot(i, shot, dur, fog_offset):
    kind = shot['kind']; src = shot['src']; out = f'work/s{i:03d}.mp4'
    nframes = int(round(dur * FPS))
    is_plate = kind in ('plate', 'title', 'endcard') or src in PLATES
    path = f'assets/plates/{src}' if (src in PLATES) else f'src/{src}'
    if kind in ('title', 'endcard') and not os.path.exists(path):
        path = 'assets/plates/v_mansion.jpg' if kind == 'title' else 'assets/plates/v_door.jpg'
    is_video = kind == 'video'
    # landscape?
    landscape = False
    if not is_plate:
        r = subprocess.run(['ffprobe', '-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height:stream_side_data=rotation', '-of', 'json', path], capture_output=True, text=True)
        j = json.loads(r.stdout or '{}'); st = (j.get('streams') or [{}])[0]
        w, h = int(st.get('width', 0)), int(st.get('height', 0)); rot = 0
        for sd in st.get('side_data_list', []) or []:
            if 'rotation' in sd: rot = abs(int(sd['rotation']))
        if rot in (90, 270): w, h = h, w
        if is_video and w and h: landscape = w > h
        elif not is_video:
            from PIL import Image, ImageOps
            if shot.get('mask_box'):          # blur/darken a screen behind people (privacy)
                clean = f'work/clean_{i:03d}.jpg'
                run([sys.executable, 'tools/privacy_mask.py', path, clean, ','.join(f'{v:.4f}' for v in shot['mask_box'])])
                im = Image.open(clean).convert('RGB')
            else:
                im = ImageOps.exif_transpose(Image.open(path)).convert('RGB')
            if shot.get('crop_box'):
                x0, y0, x1, y1 = shot['crop_box']; Wi, Hi = im.size
                im = im.crop((int(x0*Wi), int(y0*Hi), int(x1*Wi), int(y1*Hi)))
            landscape = im.size[0] > im.size[1]
            path = f'work/photo_{i:03d}.jpg'; im.save(path, quality=95)   # bake EXIF rotation + crop
    vin = float(shot.get('in', 0) or 0); slow = 1.0
    if is_video:
        avail = probe_dur(path) - vin - 0.04
        if dur > avail: slow = dur / avail          # stretch the clip instead of freezing its last frame
        if shot.get('mask_box'):
            clean = f'work/clean_{i:03d}.mp4'
            run([sys.executable, 'tools/privacy_mask.py', path, clean, ','.join(f'{v:.4f}' for v in shot['mask_box']),
                 f'{vin:.3f}', f'{min(dur / slow, avail) + 0.1:.3f}'])
            path, vin = clean, 0.0
    fog_op = 0.0 if 'fogoff' in shot.get('fx', []) else (0.55 if 'fogheavy' in shot.get('fx', []) else (0.42 if is_plate else 0.30))
    grade = GRADE_PLATE if is_plate else GRADE
    if shot.get('gamma'): grade += f",eq=gamma={float(shot['gamma']):.3f}"
    vchain = (f"[0:v]{fit_chain(kind, landscape, shot.get('crop'), shot.get('crop_x'), shot.get('crop_box'), slow)},"
              f"{move_chain(shot.get('move','push'), shot.get('shake',0), nframes, is_video, shot.get('focus'), shot.get('zoom'))},{grade}[base];")
    vchain += f"[1:v]fps={FPS},format=gray,eq=brightness=-0.04:contrast=1.1,format=gbrp[fog];"
    vchain += f"[base]format=gbrp[baseR];[baseR][fog]blend=all_mode=screen:all_opacity={fog_op},format=yuv420p[fogged];"
    tail = fx_chain(shot, dur); tx = text_chain(shot, dur, i)
    end = f",fade=t=out:st={max(0.0, dur-1.2):.3f}:d=1.2:color=black" if kind == 'endcard' else ""
    safe = ",crop=1068:1899:0:10,scale=1080:1920:flags=lanczos"     # trims any edge artefact, keeps aspect
    vchain += f"[fogged]{tail}{(','+tx) if tx else ''}{end}{safe},format=yuv420p,trim=duration={dur:.3f},setpts=PTS-STARTPTS[v]"
    cmd = ['ffmpeg', '-y', '-loglevel', 'error']
    if is_video:
        cmd += ['-ss', f"{vin:.3f}", '-to', f"{vin + dur/slow + 0.05:.3f}", '-i', path]
    else:
        cmd += ['-loop', '1', '-framerate', str(FPS), '-t', f'{dur+0.5:.3f}', '-i', path]
    cmd += ['-ss', f'{fog_offset:.2f}', '-stream_loop', '-1', '-i', 'assets/fog/fog_v.mp4']
    if is_video and shot.get('audio') == 'nat' and not shot.get('mask_box'):
        tempo = f"atempo={1/slow:.4f}," if slow > 1.001 else ""
        achain = f"[0:a]{tempo}loudnorm=I=-18:TP=-1.5:LRA=11,aresample=48000,aformat=channel_layouts=stereo,atrim=duration={dur:.3f},asetpts=PTS-STARTPTS[a]"
    else:
        cmd += ['-f', 'lavfi', '-t', f'{dur:.3f}', '-i', 'anullsrc=r=48000:cl=stereo']
        achain = f"[2:a]atrim=duration={dur:.3f},asetpts=PTS-STARTPTS[a]"
    cmd += ['-filter_complex', vchain + ';' + achain, '-map', '[v]', '-map', '[a]', '-t', f'{dur:.3f}'] + ENC + [out]
    run(cmd)
    return out

# ---------- timeline ----------
shots = EDL['shots']
music = f"assets/music/{EDL['music']}" + ('' if EDL['music'].endswith('.mp3') else '.mp3')
mstart = float(EDL.get('music_start_s', 0))
splice = EDL.get('music_splice')        # [a, b] file seconds: jump from bar a to bar b so the song's real ending plays
gap = (float(splice[1]) - float(splice[0])) if splice else 0.0
# music begins at the first non-plate shot
intro_len = 0.0
for s in shots:
    if s['kind'] in ('plate', 'title'): intro_len += float(s['dur'])
    else: break
def m2f(ft):                             # music file time -> film time
    if splice and ft >= float(splice[1]): ft -= gap
    return intro_len + ft - mstart
beats, tempo = beats_for(music, 0.0)
beats_v = [m2f(b) for b in beats if b >= mstart and not (splice and float(splice[0]) < b < float(splice[1]))]
def max_video_dur(s):
    if s['kind'] != 'video': return 1e9
    return 1.5 * max(0.3, probe_dur(f"src/{s['src']}") - float(s.get('in', 0) or 0) - 0.04)
t = 0.0; durs = []; clamps = []; pins = []
for idx, s in enumerate(shots):
    d = float(s['dur'])
    if d > max_video_dur(s): clamps.append((idx, s['src'], d, max_video_dur(s))); d = max_video_dur(s)
    if s.get('end_track_s') is not None:          # pin this cut to a musical event (music file seconds)
        pinned = m2f(float(s['end_track_s'])) - t
        if pinned >= 0.5: d = pinned
        else: pins.append(f"shot {idx:02d}: pin {s['end_track_s']} unreachable (would be {pinned:.2f}s)")
        d = round(d * FPS) / FPS; durs.append(round(d, 4)); t += d; continue
    if beats_v and t >= intro_len - 1e-6 and s['kind'] not in ('endcard',) and not s.get('nosnap'):
        target = t + d
        cands = [b for b in beats_v if b > t + max(0.6, d * 0.7)]
        if cands:
            b = min(cands, key=lambda x: abs(x - target))
            if abs(b - target) <= 0.35 and b - t <= max_video_dur(s): d = b - t
    d = round(d * FPS) / FPS                      # whole frames, so cut times never drift from the music grid
    durs.append(round(d, 4)); t += d
total = t
print(f'intro {intro_len:.2f}s, total {total:.2f}s, {len(shots)} shots')
starts = [sum(durs[:k]) for k in range(len(durs))]
for k, s in enumerate(shots):
    print(f"  {k:02d} film {starts[k]:6.2f}-{starts[k]+durs[k]:6.2f}  music {starts[k]-intro_len+mstart:6.2f}  {s['src']}")

segs = []
for i, (s, d) in enumerate(zip(shots, durs)):
    print(f"[{i:02d}] {s['kind']:7s} {s['src']:40s} {d:5.2f}s {s.get('move','')} fx={s.get('fx')} tr={s.get('transition_in')}")
    segs.append(render_shot(i, s, d, fog_offset=(i * 1.7) % 11.0))
with open('work/concat.txt', 'w') as f:
    for p in segs: f.write(f"file '{os.path.basename(p)}'\n")
run(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', 'work/concat.txt', '-c', 'copy', 'work/cut.mp4'])

# ---------- audio: drone for intro, groove from first footage, nat bites ducking ----------
drone = EDL.get('intro_drone') or 'Long_Note_Two'
drone = f"assets/music/{drone}" + ('' if drone.endswith('.mp3') else '.mp3')
# shots flagged "muffle" hear the groove low-passed, as if through the walls; the drone keeps going under them
mu = [k for k, s in enumerate(shots) if s.get('muffle')]
mu0 = (starts[mu[0]] - intro_len) if mu else 0.0
mu1 = (starts[mu[-1]] + durs[mu[-1]] - intro_len) if mu else 0.0
drone_end = intro_len + (mu1 if mu else 0.0)
mlen = total - intro_len + 0.5
natural_end = bool(splice) or bool(EDL.get('music_natural_end'))
mfade = (f"afade=t=out:st={max(0, mlen-0.8):.2f}:d=0.8" if natural_end else f"afade=t=out:st={max(0, total-intro_len-3.0):.2f}:d=3.0")
if splice:
    mus = (f"[2:a]asplit=2[ma][mb];[ma]atrim={mstart:.3f}:{float(splice[0]):.3f},asetpts=PTS-STARTPTS[m1];"
           f"[mb]atrim=start={float(splice[1]):.3f},asetpts=PTS-STARTPTS[m2];[m1][m2]acrossfade=d=0.04:c1=tri:c2=tri,")
else:
    mus = f"[2:a]atrim=start={mstart:.3f},asetpts=PTS-STARTPTS,"
af = (f"[1:a]atrim=0:{drone_end+1.5:.2f},asetpts=PTS-STARTPTS,aresample=48000,aformat=channel_layouts=stereo,loudnorm=I=-22:TP=-2:LRA=9,"
      f"afade=t=in:st=0:d=1.5,afade=t=out:st={max(0,drone_end-0.3):.2f}:d=1.2[dr];"
      f"{mus}atrim=0:{mlen:.2f},aresample=48000,aformat=channel_layouts=stereo,loudnorm=I=-15:TP=-1.5:LRA=9,"
      f"afade=t=in:st=0:d=0.6,{mfade}")
if mu:
    inside = f"clip((t-{mu0:.3f})/0.05,0,1)*clip(({mu1:.3f}-t)/0.12,0,1)"
    af += (f",asplit=2[gfull][gmuf];[gmuf]lowpass=f=380,lowpass=f=380,volume='1.6*{inside}':eval=frame[gm];"
           f"[gfull]volume='1-{inside}':eval=frame[gf];[gf][gm]amix=inputs=2:normalize=0")
af += f",adelay={int(intro_len*1000)}|{int(intro_len*1000)}[gr];"
# thunder under every lightning strike: a short crack plus a long low rumble
strikes = []
for k, s in enumerate(shots):
    fxs = set(s.get('fx', [])); tr = s.get('transition_in', 'cut')
    if tr == 'flash': strikes.append(starts[k])
    if 'flash' in fxs and tr != 'flash': strikes.append(starts[k] + max(0.3, durs[k] * 0.45))
th = []
for k, ts in enumerate(strikes):
    ms = int(ts * 1000); loud = 1.0 if ts < intro_len + mu1 + 0.5 else 0.5     # fuller in the dread, lighter under the groove
    af += (f"anoisesrc=d=4:c=brown:r=48000:a=0.9:seed={11+k},lowpass=f=170,lowpass=f=170,"
           f"afade=t=in:d=0.04,afade=t=out:st=0.35:d=3.4,volume={1.1*loud:.2f}[tr{k}];"
           f"anoisesrc=d=0.5:c=white:r=48000:a=0.6:seed={41+k},highpass=f=900,lowpass=f=5000,"
           f"afade=t=in:d=0.005,afade=t=out:st=0.02:d=0.4,volume={0.35*loud:.2f}[tc{k}];"
           f"[tr{k}][tc{k}]amix=inputs=2:normalize=0,aformat=channel_layouts=stereo,adelay=delays={ms}:all=1[th{k}];")
    th.append(f"[th{k}]")
if th: af += f"{''.join(th)}amix=inputs={len(th)}:normalize=0[thun];"
af += (f"[0:a]asplit=2[nat][sc];"
       f"[gr][sc]sidechaincompress=threshold=0.02:ratio=6:attack=80:release=900:makeup=1:level_sc=1.5[grd];"
       f"[nat][dr][grd]{'[thun]' if th else ''}amix=inputs={4 if th else 3}:duration=first:normalize=0,alimiter=limit=0.95,loudnorm=I=-14:TP=-1.0:LRA=11[a]")
run(['ffmpeg', '-y', '-loglevel', 'error', '-i', 'work/cut.mp4', '-i', drone, '-i', music,
     '-filter_complex', af, '-map', '0:v', '-map', '[a]', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', f'work/{OUT}_master.mp4'])
# social deliverable: bitrate-capped so it stays under GitHub's 100 MB file limit (platforms re-encode anyway)
def social(crf):
    run(['ffmpeg', '-y', '-loglevel', 'error', '-i', f'work/{OUT}_master.mp4', '-c:v', 'libx264', '-preset', 'slow', '-crf', str(crf),
         '-maxrate', '7M', '-bufsize', '14M', '-pix_fmt', 'yuv420p', '-c:a', 'copy', '-movflags', '+faststart', f'out/{OUT}.mp4'])
social(22)
if os.path.getsize(f'out/{OUT}.mp4') > 95 * 1024 * 1024: social(26)
print('social size MB', round(os.path.getsize(f'out/{OUT}.mp4') / 1048576, 1), 'master MB', round(os.path.getsize(f'work/{OUT}_master.mp4') / 1048576, 1))
run(['ffmpeg', '-y', '-loglevel', 'error', '-i', f'out/{OUT}.mp4', '-vf', 'fps=1/2,scale=216:-2,tile=10x5', '-frames:v', '1', f'out/_sheet_{OUT}.jpg'])
run(['ffmpeg', '-y', '-loglevel', 'error', '-i', f'out/{OUT}.mp4', '-vf', 'scale=540:960', '-c:v', 'libx264', '-crf', '27', '-preset', 'fast', '-c:a', 'aac', '-b:a', '96k', f'out/_preview_{OUT}.mp4'])
json.dump({'durs': durs, 'starts': starts, 'total': total, 'intro': intro_len, 'tempo': tempo, 'strikes': strikes, 'muffle': [mu0, mu1] if mu else None}, open(f'out/_timeline_{OUT}.json', 'w'), indent=1)
# ---------- QA artefacts ----------
from PIL import Image, ImageDraw, ImageFont
qa = f'out/qa_{OUT}'; os.makedirs(qa, exist_ok=True)
thumbs = []
for i, (s, d) in enumerate(zip(shots, durs)):
    fp = f'{qa}/shot_{i:02d}.jpg'
    run(['ffmpeg', '-y', '-loglevel', 'error', '-ss', f'{d*0.6:.2f}', '-i', f'work/s{i:03d}.mp4', '-frames:v', '1', '-vf', 'scale=432:768', '-q:v', '3', fp])
    thumbs.append(fp)
cols = 8; tw, th = 216, 384; rows = (len(thumbs) + cols - 1) // cols
sheet = Image.new('RGB', (cols*tw, rows*(th+28)), (12, 12, 12)); dr = ImageDraw.Draw(sheet)
lab = ImageFont.truetype(FONT_S, 18)
for k, fp in enumerate(thumbs):
    im = Image.open(fp).resize((tw, th)); x, y = (k % cols)*tw, (k // cols)*(th+28)
    sheet.paste(im, (x, y)); dr.text((x+4, y+th+4), f"{k:02d} {shots[k]['src'][-14:]}", font=lab, fill=(220, 220, 220))
sheet.save(f'out/_shots_{OUT}.jpg', quality=85)
checks = [f'clamped (requested > clip allows): {c}' for c in clamps] + pins
for k, fp in enumerate(thumbs):
    g = Image.open(fp).convert('L'); Wq, Hq = g.size
    edge = sum(g.getpixel((Wq-2, y)) for y in range(0, Hq, 4)) / (Hq / 4)
    inner = sum(g.getpixel((Wq-24, y)) for y in range(0, Hq, 4)) / (Hq / 4)
    if inner > 30 and edge < 0.6 * inner: checks.append(f'shot {k:02d}: dark right edge {edge:.0f} vs {inner:.0f}')
open(f'out/_qa_checks_{OUT}.txt', 'w').write('\n'.join(checks) or 'all checks passed')
print('QA checks:', checks or 'all passed')
run(['ffmpeg', '-y', '-loglevel', 'error', '-i', f'out/{OUT}.mp4', '-filter_complex', 'showwavespic=s=2400x360:colors=0x9fd3ff', '-frames:v', '1', f'{qa}/wave.png'])
wv = Image.open(f'{qa}/wave.png').convert('RGB'); d2 = ImageDraw.Draw(wv); acc = 0.0
for k, d in enumerate(durs):
    x = int(acc / total * wv.size[0]); d2.line([(x, 0), (x, wv.size[1])], fill=(255, 120, 0), width=1)
    if shots[k].get('audio') == 'nat': d2.rectangle([x, 0, int((acc+d)/total*wv.size[0]), 14], fill=(255, 40, 40))
    acc += d
wv.save(f'out/_wave_{OUT}.png')
r = subprocess.run(['ffmpeg', '-i', f'out/{OUT}.mp4', '-af', 'loudnorm=print_format=summary', '-f', 'null', '-'], capture_output=True, text=True, stdin=subprocess.DEVNULL)
open(f'out/_loudness_{OUT}.txt', 'w').write('\n'.join(l for l in r.stderr.splitlines() if 'Input' in l))
print('done', total)
