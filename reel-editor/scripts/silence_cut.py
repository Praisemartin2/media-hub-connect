#!/usr/bin/env python3
"""
Energy-based silence / awkward-pause remover for talking-head videos.

Why energy-based: a fixed dB threshold (e.g. ffmpeg silencedetect at -30dB)
misclassifies quiet speech as silence. This script instead inspects the audio
RMS envelope, finds the valley between the silence and speech clusters, and
cuts everything below it — keeping quiet speech intact.

Usage:
    python silence_cut.py INPUT.mov OUTPUT.mp4 [--thresh -40] [--min-sil 0.35]
                          [--pad 0.10] [--keep-json path.json]

Notes:
- ffmpeg/ffprobe come from the pip `imageio-ffmpeg` package (no system install
  needed). `pip install imageio-ffmpeg numpy`.
- Pass --keep-json to dump the kept [start,end] segment list (re-usable to
  rebuild the exact same cut, e.g. in Remotion via OffthreadVideo trims).
"""
import argparse, json, subprocess, sys, wave, tempfile, os
import numpy as np
import imageio_ffmpeg

FF = imageio_ffmpeg.get_ffmpeg_exe()


def extract_wav(src, dst):
    subprocess.run([FF, "-hide_banner", "-loglevel", "error", "-y", "-i", src,
                    "-ac", "1", "-ar", "16000", dst], check=True)


def keep_segments(wav, thresh, min_sil, pad, min_seg=0.25, close_hole=0.20):
    w = wave.open(wav, "rb"); sr = w.getframerate(); n = w.getnframes()
    a = np.frombuffer(w.readframes(n), dtype=np.int16).astype(np.float32) / 32768.0
    dur = len(a) / sr
    hop = int(0.02 * sr); frames = len(a) // hop
    rms = np.array([np.sqrt(np.mean(a[i*hop:(i+1)*hop] ** 2) + 1e-12) for i in range(frames)])
    db = 20 * np.log10(rms + 1e-12)
    t = np.arange(frames) * 0.02
    sp = db > thresh
    # close holes shorter than close_hole so we don't cut mid-word
    hole = int(close_hole / 0.02); run = 0
    for i in range(len(sp)):
        if not sp[i]:
            run += 1
        else:
            if 0 < run <= hole:
                sp[i-run:i] = True
            run = 0
    # speech runs
    segs = []; i = 0
    while i < len(sp):
        if sp[i]:
            j = i
            while j < len(sp) and sp[j]:
                j += 1
            segs.append([float(t[i]), float(t[min(j, len(sp)-1)])]); i = j
        else:
            i += 1
    # pad + merge across small gaps
    out = []
    for s, e in segs:
        s = max(0.0, s - pad); e = min(dur, e + pad)
        if out and s - out[-1][1] < min_sil:
            out[-1][1] = e
        else:
            out.append([s, e])
    out = [seg for seg in out if seg[1] - seg[0] >= min_seg]
    # drop isolated sub-0.5s blips
    out = [seg for k, seg in enumerate(out)
           if not (seg[1]-seg[0] < 0.5
                   and (seg[0] - (out[k-1][1] if k > 0 else 0)) > 1.5
                   and ((out[k+1][0] if k < len(out)-1 else 1e9) - seg[1]) > 1.5)]
    return out, dur


def render(src, segs, dst):
    parts, v, a = [], [], []
    for i, (s, e) in enumerate(segs):
        parts.append(f"[0:v]trim=start={s:.3f}:end={e:.3f},setpts=PTS-STARTPTS[v{i}]")
        parts.append(f"[0:a]atrim=start={s:.3f}:end={e:.3f},asetpts=PTS-STARTPTS[a{i}]")
        v.append(f"[v{i}]"); a.append(f"[a{i}]")
    fc = ";".join(parts) + ";" + "".join(v[i]+a[i] for i in range(len(segs))) + \
        f"concat=n={len(segs)}:v=1:a=1[v][a]"
    with tempfile.NamedTemporaryFile("w", suffix=".txt", delete=False) as f:
        f.write(fc); fcpath = f.name
    subprocess.run([FF, "-hide_banner", "-loglevel", "error", "-y", "-i", src,
                    "-/filter_complex", fcpath, "-map", "[v]", "-map", "[a]",
                    "-c:v", "libx264", "-preset", "medium", "-crf", "20",
                    "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "160k",
                    "-movflags", "+faststart", dst], check=True)
    os.unlink(fcpath)


def main():
    p = argparse.ArgumentParser()
    p.add_argument("input"); p.add_argument("output")
    p.add_argument("--thresh", type=float, default=-40.0)
    p.add_argument("--min-sil", type=float, default=0.35)
    p.add_argument("--pad", type=float, default=0.10)
    p.add_argument("--keep-json", default=None)
    args = p.parse_args()
    with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as f:
        wav = f.name
    extract_wav(args.input, wav)
    segs, dur = keep_segments(wav, args.thresh, args.min_sil, args.pad)
    os.unlink(wav)
    kept = sum(e - s for s, e in segs)
    print(f"original={dur:.1f}s kept={kept:.1f}s removed={dur-kept:.1f}s "
          f"({100*(dur-kept)/dur:.0f}%) segments={len(segs)}")
    if args.keep_json:
        json.dump(segs, open(args.keep_json, "w"))
    render(args.input, segs, args.output)
    print("wrote", args.output)


if __name__ == "__main__":
    main()
