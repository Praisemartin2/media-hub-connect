#!/usr/bin/env python3
"""Procedural drifting fog loop. Writes raw gray frames to stdout for ffmpeg.
usage: python3 fog.py WIDTH HEIGHT FPS SECONDS | ffmpeg -f rawvideo -pix_fmt gray -s WxH -r FPS -i - ...
Fractal value noise, 3 octaves, drifting left-to-right with slow vertical swirl; brightest near the bottom.
"""
import sys, numpy as np
W, H, FPS, SEC = int(sys.argv[1]), int(sys.argv[2]), int(sys.argv[3]), float(sys.argv[4])
N = int(FPS * SEC)
rng = np.random.default_rng(7)
def grid(gw, gh):
    return rng.random((gh + 2, gw + 2)).astype(np.float32)
def sample(g, xs, ys):
    gh, gw = g.shape[0] - 2, g.shape[1] - 2
    x = xs % gw; y = ys % gh
    x0 = np.floor(x).astype(int); y0 = np.floor(y).astype(int)
    fx = x - x0; fy = y - y0
    fx = fx * fx * (3 - 2 * fx); fy = fy * fy * (3 - 2 * fy)
    a = g[y0, x0]; b = g[y0, x0 + 1]; c = g[y0 + 1, x0]; d = g[y0 + 1, x0 + 1]
    return (a * (1 - fx) + b * fx) * (1 - fy) + (c * (1 - fx) + d * fx) * fy
# low-res field, upscaled by ffmpeg scale + gblur
w, h = W, H                       # write exactly the size ffmpeg is told to read (was hard-coded 480x270)
if h > w:   # portrait: grids taller than wide so the noise cells stay round
    octs = [(grid(4, 6), 4, 6, 1.0, 0.030), (grid(8, 12), 8, 12, 0.5, 0.055), (grid(14, 24), 14, 24, 0.25, 0.090)]
else:
    octs = [(grid(6, 4), 6, 4, 1.0, 0.030), (grid(12, 8), 12, 8, 0.5, 0.055), (grid(24, 14), 24, 14, 0.25, 0.090)]
yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
grad = np.clip((yy / h - 0.25) / 0.75, 0, 1) ** 1.4   # denser at the bottom
out = sys.stdout.buffer
for f in range(N):
    t = f / FPS
    acc = np.zeros((h, w), np.float32); norm = 0
    for g, gw, gh, amp, speed in octs:
        xs = xx / w * gw + t * speed * gw
        ys = yy / h * gh + 0.15 * np.sin(t * 0.25 + xx / w * 3.0) + t * 0.004 * gh
        acc += amp * sample(g, xs, ys); norm += amp
    v = acc / norm
    v = np.clip((v - 0.35) / 0.45, 0, 1) * grad
    out.write((v * 255).astype(np.uint8).tobytes())
