# Free-use photo plan — Ekabo news carousels

All images below are from **Pexels** (Pexels License: free for commercial & personal
use, **no attribution required**). Open the link → "Free Download" → choose a large size.

## Post A — US housing policy
- **Slide 1 (cover) — US Capitol:** https://www.pexels.com/photo/the-us-capitol-building-under-cloudy-blue-sky-5012381/
  - alt: https://www.pexels.com/photo/us-capitol-building-under-the-blue-sky-13727885/
- **Slide 5 (CTA accent) — suburban homes / new construction:**
  https://www.pexels.com/photo/american-suburban-neighborhood-houses-8504300/
  - alt (single family home): https://www.pexels.com/photo/project-of-a-family-house-4469137/

## Post B — Atlanta zoning
- **Slide 1 (cover) — Atlanta skyline (iconic Jackson St Bridge view):**
  https://www.pexels.com/photo/atlanta-skyline-from-jackson-street-bridge-35420341/
  - alt (aerial downtown): https://www.pexels.com/photo/aerial-view-of-downtown-atlanta-skyline-33133739/
- **Slide 5 (CTA accent) — Atlanta at sunset:**
  https://www.pexels.com/photo/city-of-atlanta-at-sunset-11599618/

## Compositing note
The slide code is ready to take a full-bleed background photo on the cover + CTA
(brand cobalt/rust scrim over the image, headline on top — exactly like the
reference). To actually place them I need the image *bytes* in the container, which
this environment's egress blocks for every image host. Two ways to unblock:
  1. Add `images.pexels.com` (and/or `d8j0ntlcm91z4.cloudfront.net` for AI photos)
     to the network egress allowlist, then a fresh session fetches + composites.
  2. Download the 4 picks above and upload them here; I composite immediately.
