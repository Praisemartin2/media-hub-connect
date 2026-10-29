#!/usr/bin/env python3
"""Blur + darken a screen (e.g. a TV showing a login page) behind people, without touching the people.

usage: python3 privacy_mask.py SRC OUT BOX [IN DUR]
  SRC  photo or video (EXIF / rotation honoured)
  OUT  .jpg for photos, .mp4 (30 fps, video-only) for videos
  BOX  x0,y0,x1,y1 normalised to the upright source frame, a generous box around the screen
  IN DUR  for videos: only this window is processed (the render then uses in=0)
Foreground (people, balloons) is protected with a rembg salient-object mask, dilated a few pixels;
the blur is computed from the background alone so people leave no dark halo in it.
"""
import sys, os, subprocess, tempfile, glob
import numpy as np
from PIL import Image, ImageOps, ImageFilter
from rembg import remove, new_session

SRC, OUT, BOX = sys.argv[1], sys.argv[2], [float(v) for v in sys.argv[3].split(',')]
IN = float(sys.argv[4]) if len(sys.argv) > 4 else 0.0
DUR = float(sys.argv[5]) if len(sys.argv) > 5 else 0.0
sess = new_session('u2net')

def soft_blur(arr, sigma):
    # heavy gaussian blur done at quarter resolution (same look, a fraction of the cost)
    h, w = arr.shape[:2]; k = 4
    if arr.ndim == 2:
        im = Image.fromarray((np.clip(arr, 0, 1) * 255).astype(np.uint8))
    else:
        im = Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8))
    im = im.resize((max(1, w // k), max(1, h // k)), Image.BILINEAR).filter(ImageFilter.GaussianBlur(max(1, sigma / k)))
    out = np.asarray(im.resize((w, h), Image.BILINEAR), np.float32)
    return out / 255.0 if arr.ndim == 2 else out

def clean(im):
    im = im.convert('RGB'); W, H = im.size
    x0, y0, x1, y1 = int(BOX[0]*W), int(BOX[1]*H), int(BOX[2]*W), int(BOX[3]*H)
    box = Image.new('L', (W, H), 0); box.paste(255, (x0, y0, x1, y1))
    box = np.asarray(box.filter(ImageFilter.GaussianBlur(max(6, W // 60))), np.float32) / 255.0
    fg = remove(im, session=sess, only_mask=True, post_process_mask=True)        # L, 255 = foreground
    grow = max(3, (W // 360) | 1)                                                 # a few px of margin, scaled to the frame
    keep = np.asarray(fg.filter(ImageFilter.MaxFilter(grow)).filter(ImageFilter.GaussianBlur(max(2, W // 540))), np.float32) / 255.0
    a = np.asarray(im, np.float32)
    # blur the background only (normalised convolution), so people do not smear dark halos into it
    bg = 1.0 - np.asarray(fg.filter(ImageFilter.MaxFilter(grow + 4)), np.float32) / 255.0
    sig = max(18, W // 40)
    num = soft_blur(a * bg[..., None], sig); den = soft_blur(bg, sig)[..., None]
    b = np.where(den > 0.03, num / np.maximum(den, 1e-3), soft_blur(a, sig))
    lum = b.mean(axis=2, keepdims=True)
    b = (0.55 * b + 0.45 * lum) * 0.55                                            # desaturate + darken
    m = box * (1.0 - keep)
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
