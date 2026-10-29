#!/usr/bin/env python3
"""Blur + darken a screen (e.g. a TV showing a login page) behind people, without touching the people.

usage: python3 privacy_mask.py SRC OUT BOX [IN DUR]
  SRC  photo or video (EXIF / rotation honoured)
  OUT  .jpg for photos, .mp4 (30 fps, video-only) for videos
  BOX  x0,y0,x1,y1 normalised to the upright source frame, a generous box around the screen
  IN DUR  for videos: only this window is processed (the render then uses in=0)
Foreground (people, balloons) is protected with a rembg salient-object mask, dilated a little.
"""
import sys, os, subprocess, tempfile, glob
import numpy as np
from PIL import Image, ImageOps, ImageFilter
from rembg import remove, new_session

SRC, OUT, BOX = sys.argv[1], sys.argv[2], [float(v) for v in sys.argv[3].split(',')]
IN = float(sys.argv[4]) if len(sys.argv) > 4 else 0.0
DUR = float(sys.argv[5]) if len(sys.argv) > 5 else 0.0
sess = new_session('u2net')

def clean(im):
    im = im.convert('RGB'); W, H = im.size
    x0, y0, x1, y1 = int(BOX[0]*W), int(BOX[1]*H), int(BOX[2]*W), int(BOX[3]*H)
    box = Image.new('L', (W, H), 0); box.paste(255, (x0, y0, x1, y1))
    box = box.filter(ImageFilter.GaussianBlur(max(6, W // 60)))
    fg = remove(im, session=sess, only_mask=True, post_process_mask=True)        # L, 255 = foreground
    fg = fg.filter(ImageFilter.MaxFilter(9)).filter(ImageFilter.GaussianBlur(3))
    m = (np.asarray(box, np.float32) / 255.0) * (1.0 - np.asarray(fg, np.float32) / 255.0)
    blurred = im.filter(ImageFilter.GaussianBlur(max(18, W // 40)))
    b = np.asarray(blurred, np.float32)
    lum = b.mean(axis=2, keepdims=True)
    b = (0.55 * b + 0.45 * lum) * 0.42                                            # desaturate + darken
    a = np.asarray(im, np.float32)
    out = a * (1 - m[..., None]) + b * m[..., None]
    return Image.fromarray(np.clip(out, 0, 255).astype(np.uint8))

ext = os.path.splitext(SRC)[1].lower()
if ext in ('.jpg', '.jpeg', '.png'):
    im = ImageOps.exif_transpose(Image.open(SRC))
    clean(im).save(OUT, quality=95)
else:
    tmp = tempfile.mkdtemp()
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-ss', f'{IN:.3f}', '-t', f'{DUR:.3f}', '-i', SRC,
                    '-vf', 'fps=30', f'{tmp}/f_%04d.png'], check=True, stdin=subprocess.DEVNULL)
    frames = sorted(glob.glob(f'{tmp}/f_*.png'))
    for k, f in enumerate(frames):
        clean(Image.open(f)).save(f)
        if k % 20 == 0: print(f'{os.path.basename(SRC)} frame {k}/{len(frames)}', flush=True)
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-framerate', '30', '-i', f'{tmp}/f_%04d.png',
                    '-c:v', 'libx264', '-crf', '14', '-preset', 'medium', '-pix_fmt', 'yuv420p', OUT], check=True, stdin=subprocess.DEVNULL)
print('wrote', OUT)
