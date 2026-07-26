import json
from faster_whisper import WhisperModel

model = WhisperModel("small.en", device="cpu", compute_type="int8")
segments, info = model.transcribe("va/clip_va.mp4", word_timestamps=True, vad_filter=True)
words, segs = [], []
for seg in segments:
    segs.append({"start": round(seg.start, 2), "end": round(seg.end, 2), "text": seg.text.strip()})
    for w in (seg.words or []):
        words.append({"w": w.word.strip(), "start": round(w.start, 3), "end": round(w.end, 3)})
json.dump({"segments": segs, "words": words}, open("va/clip_va_tr.json", "w"), indent=1)
print(len(words), "words")
