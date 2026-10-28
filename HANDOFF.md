
## Status (2026-10-28, evening)
- Event folder 1dN60Fsa1aKRptaK7Xzn7bsuNQd0gRXQV: 84 files (21 videos, 62 photos, 1 flyer). Manifest: halloween/manifest.tsv.
- Every file reviewed (analysis/ + workflow notes); two director EDLs produced; Director A ("a day in the haunted
  office", Bump_in_the_Night @ 107 bpm, Long_Note_Two drone intro) is halloween/edl.json.
- Excluded on purpose: 20261028_122047.mp4 (management role-play about disciplining an employee) and the
  Charter House flyer.
- Render: .github/workflows/halloween-render.yml runs render_v.py; social master (<100 MB) + 540p preview +
  QA sheets land in halloween/out/; the full-quality master is a 30-day workflow artifact.
- v1 issues fixed in v2: clipped title, purple cast (fog was screen-blended in YUV), flicker/lightning not
  animating (eq needs eval=frame), flat grade.
