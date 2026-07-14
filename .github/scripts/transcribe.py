import json, sys
from faster_whisper import WhisperModel
model = WhisperModel("small.en", device="cpu", compute_type="int8")
for key in ["v1","v2","v3","v4"]:
    path = f"drive_src/{key}.mp4"
    segments, info = model.transcribe(path, word_timestamps=True, vad_filter=True)
    words, segs = [], []
    for seg in segments:
        segs.append({"start": round(seg.start,2), "end": round(seg.end,2), "text": seg.text.strip()})
        for w in (seg.words or []):
            words.append({"w": w.word.strip(), "start": round(w.start,3), "end": round(w.end,3)})
    json.dump({"segments": segs, "words": words}, open(f"drive_src/{key}_transcript.json","w"), indent=1)
    print(f"{key}: {len(segs)} segments, {len(words)} words")
