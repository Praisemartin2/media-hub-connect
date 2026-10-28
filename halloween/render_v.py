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
def crop_expr(crop):
    # landscape -> 9:16 window by height
    cw = 'ih*9/16'
    x = {'left': '0', 'right': f'iw-{cw}', 'center': f'(iw-{cw})/2'}.get(crop or 'center', f'(iw-{cw})/2')
    return f'crop={cw}:ih:{x}:0'

def fit_chain(kind, src_is_landscape, crop):
    # produce 2x oversampled 9:16 frame for zoompan (2160x3840); videos normalised to 30 fps first
    pre = f"fps={FPS}," if kind == 'video' else ""
    if src_is_landscape:
        return f"{pre}{crop_expr(crop)},scale=2160:3840:flags=lanczos,setsar=1"
    return f"{pre}scale=2160:3840:force_original_aspect_ratio=increase:flags=lanczos,crop=2160:3840,setsar=1"

def move_chain(move, shake, nframes, is_video):
    N = max(1, nframes); s = 10 * shake
    amp = 0.06 if is_video else 0.10
    z = {'push': f'1+{amp}*on/{N}', 'pull': f'1+{amp}-{amp}*on/{N}', 'hold': '1.02',
         'pan_left': f'1+{amp}', 'pan_right': f'1+{amp}'}.get(move, f'1+{amp}*on/{N}')
    jx = f'+{s}*sin(on/3.1)+{s*0.6}*sin(on/7.3)' if shake else ''
    jy = f'+{s*0.8}*sin(on/4.3)+{s*0.5}*cos(on/9.1)' if shake else ''
    if move == 'pan_left': x = f'(iw-iw/zoom)*(1-on/{N}){jx}'
    elif move == 'pan_right': x = f'(iw-iw/zoom)*(on/{N}){jx}'
    else: x = f'iw/2-(iw/zoom/2){jx}'
    y = f'ih/2-(ih/zoom/2){jy}'
    return f"zoompan=z='{z}':x='{x}':y='{y}':d=1:s={W}x{H}:fps={FPS}"

GRADE = ("eq=contrast=1.10:brightness=-0.03:saturation=0.78,"
         "colorbalance=rs=-0.08:gs=0.04:bs=0.08:rm=-0.06:gm=0.03:bm=0.05:rh=-0.02:gh=0.0:bh=0.02")
GRADE_PLATE = "eq=contrast=1.06:brightness=-0.02:saturation=0.9"

def fx_chain(shot, dur):
    fx = set(shot.get('fx', [])); tr = shot.get('transition_in', 'cut'); parts = []
    if 'flicker' in fx: parts.append("eq=brightness='0.012*sin(31*t)+0.008*sin(53*t)'")
    if 'glitch' in fx or tr == 'glitch':
        parts.append("rgbashift=rh=10:bh=-10:enable='lt(t,0.22)'")
        parts.append("noise=alls=40:allf=t:enable='lt(t,0.22)'")
    parts.append("noise=alls=11:allf=t+u")
    parts.append("vignette=PI/4.6")
    if tr == 'flash': parts.append("fade=t=in:st=0:d=0.18:color=white")
    elif tr == 'fadeblack': parts.append("fade=t=in:st=0:d=0.6:color=black")
    elif tr == 'fadewhite': parts.append("fade=t=in:st=0:d=0.5:color=white")
    if 'flash' in fx and tr != 'flash':  # a lightning hit mid-shot
        t0 = max(0.3, dur * 0.45)
        parts.append(f"eq=brightness='if(between(t,{t0:.2f},{t0+0.08:.2f}),0.6,if(between(t,{t0+0.14:.2f},{t0+0.2:.2f}),0.35,0))'")
    return ','.join(parts)

def text_chain(shot, dur):
    parts = []
    if shot.get('text'):
        is_end = shot['kind'] == 'endcard'
        size = 150 if is_end else 170
        parts.append(f"drawtext=fontfile={FONT_T}:text='{esc(shot['text'])}':fontsize={size}:fontcolor=0xE8E0CC@0.96:"
                     f"x=(w-text_w)/2:y=(h-text_h)/2-120:alpha='min(1,max(0,(t-0.6)/0.5))':shadowcolor=black@0.9:shadowx=0:shadowy=12:"
                     f"borderw=0")
    if shot.get('text2'):
        parts.append(f"drawtext=fontfile={FONT_S}:text='{esc(shot['text2'])}':fontsize=46:fontcolor=0xC9B98A@0.92:"
                     f"x=(w-text_w)/2:y=(h/2)+70:alpha='min(1,max(0,(t-1.2)/0.5))':shadowcolor=black@0.8:shadowx=0:shadowy=6")
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
            im = ImageOps.exif_transpose(Image.open(path)).convert('RGB'); landscape = im.size[0] > im.size[1]
            path = f'work/photo_{i:03d}.jpg'; im.save(path, quality=95)   # bake EXIF rotation
    fog_op = 0.0 if 'fogoff' in shot.get('fx', []) else (0.55 if 'fogheavy' in shot.get('fx', []) else (0.42 if is_plate else 0.30))
    grade = GRADE_PLATE if is_plate else GRADE
    vchain = f"[0:v]{fit_chain(kind, landscape, shot.get('crop'))},{move_chain(shot.get('move','push'), shot.get('shake',0), nframes, is_video)},{grade}[base];"
    vchain += f"[1:v]format=gray,eq=brightness=-0.04:contrast=1.1,format=yuv420p[fog];"
    vchain += f"[base][fog]blend=all_mode=screen:all_opacity={fog_op}[fogged];"
    tail = fx_chain(shot, dur); tx = text_chain(shot, dur)
    vchain += f"[fogged]{tail}{(','+tx) if tx else ''},format=yuv420p,trim=duration={dur:.3f},setpts=PTS-STARTPTS[v]"
    cmd = ['ffmpeg', '-y', '-loglevel', 'error']
    if is_video:
        cmd += ['-ss', f"{shot.get('in',0):.3f}", '-to', f"{shot.get('in',0)+dur:.3f}", '-i', path]
    else:
        cmd += ['-loop', '1', '-framerate', str(FPS), '-t', f'{dur+0.5:.3f}', '-i', path]
    cmd += ['-ss', f'{fog_offset:.2f}', '-stream_loop', '-1', '-i', 'assets/fog/fog_v.mp4']
    if is_video and shot.get('audio') == 'nat':
        achain = f"[0:a]loudnorm=I=-18:TP=-1.5:LRA=11,aresample=48000,aformat=channel_layouts=stereo,atrim=duration={dur:.3f},asetpts=PTS-STARTPTS[a]"
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
# music begins at the first non-plate shot
intro_len = 0.0
for s in shots:
    if s['kind'] in ('plate', 'title'): intro_len += float(s['dur'])
    else: break
beats, tempo = beats_for(music, mstart)
beats_v = [intro_len + b for b in beats]
t = 0.0; durs = []
for idx, s in enumerate(shots):
    d = float(s['dur'])
    if beats_v and t >= intro_len - 1e-6 and s['kind'] not in ('endcard',):
        target = t + d
        cands = [b for b in beats_v if b > t + max(0.6, d * 0.7)]
        if cands:
            b = min(cands, key=lambda x: abs(x - target))
            if abs(b - target) <= 0.35: d = b - t
    durs.append(round(d, 3)); t += d
total = t
print(f'intro {intro_len:.2f}s, total {total:.2f}s, {len(shots)} shots')

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
fade_in_groove = 0.6
af = (f"[1:a]atrim=0:{intro_len+1.5:.2f},asetpts=PTS-STARTPTS,aresample=48000,aformat=channel_layouts=stereo,loudnorm=I=-22:TP=-2:LRA=9,"
      f"afade=t=in:st=0:d=1.5,afade=t=out:st={max(0,intro_len-0.3):.2f}:d=1.2[dr];"
      f"[2:a]atrim=0:{total-intro_len+0.5:.2f},asetpts=PTS-STARTPTS,aresample=48000,aformat=channel_layouts=stereo,loudnorm=I=-15:TP=-1.5:LRA=9,"
      f"afade=t=in:st=0:d={fade_in_groove},afade=t=out:st={max(0,total-intro_len-3.0):.2f}:d=3.0,adelay={int(intro_len*1000)}|{int(intro_len*1000)}[gr];"
      f"[0:a]asplit=2[nat][sc];"
      f"[gr][sc]sidechaincompress=threshold=0.02:ratio=6:attack=80:release=900:makeup=1:level_sc=1.5[grd];"
      f"[nat][dr][grd]amix=inputs=3:duration=first:normalize=0,alimiter=limit=0.95,loudnorm=I=-14:TP=-1.0:LRA=11[a]")
run(['ffmpeg', '-y', '-loglevel', 'error', '-i', 'work/cut.mp4', '-i', drone, '-ss', f'{mstart:.2f}', '-i', music,
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
json.dump({'durs': durs, 'total': total, 'intro': intro_len, 'tempo': tempo}, open(f'out/_timeline_{OUT}.json', 'w'), indent=1)
print('done', total)
