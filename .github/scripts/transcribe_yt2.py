import json
from faster_whisper import WhisperModel
model = WhisperModel("small.en", device="cpu", compute_type="int8")
for key in ["c1_pmi","c2_triplex","c3_heloc","c4_hardmoney","c5_dscr"]:
    segments, info = model.transcribe(f"yt2clips/{key}.mp4", word_timestamps=True, vad_filter=True)
    words, segs = [], []
    for seg in segments:
        segs.append({"start": round(seg.start,2), "end": round(seg.end,2), "text": seg.text.strip()})
        for w in (seg.words or []): words.append({"w": w.word.strip(), "start": round(w.start,3), "end": round(w.end,3)})
    json.dump({"segments":segs,"words":words}, open(f"yt2clips/{key}_tr.json","w"), indent=1)
    print(key, len(words), "words")
