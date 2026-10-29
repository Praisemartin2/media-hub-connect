#!/usr/bin/env python3
"""Blur + darken a screen (e.g. a TV showing a login page) behind people, without touching the people.

usage: python3 privacy_mask.py SRC OUT BOX [IN DUR] [--keep x0,y0,x1,y1] [--model NAME]
  SRC  photo or video (EXIF / rotation honoured)
  OUT  .jpg for photos, .mp4 (30 fps, video-only) for videos
  BOX  x0,y0,x1,y1 normalised to the upright source frame, a generous box around the screen
  IN DUR  for videos: only this window is processed (the render then uses in=0)
  --keep  extra region (normalised) where anything the segmenter even faintly calls foreground is kept
          (thin props such as a cone hat in front of the screen)
  --model rembg model, default isnet-general-use (cleaner hair and hat edges than u2net)
People and props are protected with a segmentation mask, held over +-3 frames in videos so a hat that
drops out of one frame does not flicker. The mask is feathered inward, so no sharp screen pixels survive
around a silhouette, and the blur is computed from the background alone so people leave no dark halo in it.
"""
import sys, os, subprocess, tempfile, glob
import numpy as np
from PIL import Image, ImageOps, ImageFilter
from rembg import remove, new_session

args = sys.argv[1:]
def opt(name, default=None):
    if name in args:
        i = args.index(name); v = args[i + 1]; del args[i:i + 2]; return v
    return default
KEEP = opt('--keep'); KEEP = [float(v) for v in KEEP.split(',')] if KEEP else None
MODEL = opt('--model', 'isnet-general-use')
SRC, OUT, BOX = args[0], args[1], [float(v) for v in args[2].split(',')]
IN = float(args[3]) if len(args) > 3 else 0.0
DUR = float(args[4]) if len(args) > 4 else 0.0
sess = new_session(MODEL)

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

def fg_mask(im):
    # float 0..1 foreground probability; inside --keep, faint foreground counts as foreground
    fg = np.asarray(remove(im, session=sess, only_mask=True, post_process_mask=False), np.float32) / 255.0
    if KEEP:
        H, W = fg.shape; x0, y0, x1, y1 = int(KEEP[0]*W), int(KEEP[1]*H), int(KEEP[2]*W), int(KEEP[3]*H)
        sub = fg[y0:y1, x0:x1]; fg[y0:y1, x0:x1] = np.maximum(sub, (sub > 0.05).astype(np.float32))
    return fg

def clean(im, fg):
    im = im.convert('RGB'); W, H = im.size
    x0, y0, x1, y1 = int(BOX[0]*W), int(BOX[1]*H), int(BOX[2]*W), int(BOX[3]*H)
    box = Image.new('L', (W, H), 0); box.paste(255, (x0, y0, x1, y1))
    box = np.asarray(box.filter(ImageFilter.GaussianBlur(max(6, W // 60))), np.float32) / 255.0
    hard = Image.fromarray(((fg > 0.5) * 255).astype(np.uint8))
    grow = max(3, (W // 360) | 1)
    # feather inward: the soft edge sits just inside the silhouette, so no sharp screen pixels ring it
    keep = np.asarray(hard.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(max(2, W // 540))), np.float32) / 255.0
    a = np.asarray(im, np.float32)
    # blur the background only (normalised convolution), so people do not smear dark halos into it
    bg = 1.0 - np.asarray(hard.filter(ImageFilter.MaxFilter(grow + 4)), np.float32) / 255.0
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
    im = ImageOps.exif_transpose(Image.open(SRC)).convert('RGB')
    clean(im, fg_mask(im)).save(OUT, quality=95)
else:
    tmp = tempfile.mkdtemp()
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-ss', f'{IN:.3f}', '-t', f'{DUR:.3f}', '-i', SRC,
                    '-vf', 'fps=30', f'{tmp}/f_%04d.png'], check=True, stdin=subprocess.DEVNULL)
    frames = sorted(glob.glob(f'{tmp}/f_*.png'))
    masks = []
    for k, f in enumerate(frames):
        masks.append(fg_mask(Image.open(f).convert('RGB')))
        if k % 20 == 0: print(f'{os.path.basename(SRC)} mask {k}/{len(frames)}', flush=True)
    for k, f in enumerate(frames):
        held = np.max(np.stack(masks[max(0, k - 3):k + 4]), axis=0)   # hold foreground over +-3 frames: no flicker
        clean(Image.open(f), held).save(f)
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-framerate', '30', '-i', f'{tmp}/f_%04d.png',
                    '-c:v', 'libx264', '-crf', '14', '-preset', 'medium', '-pix_fmt', 'yuv420p', OUT], check=True, stdin=subprocess.DEVNULL)
print('wrote', OUT)
