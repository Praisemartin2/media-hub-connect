import json, subprocess, urllib.parse, urllib.request, os

UA = "EkaboHomeBot/1.0 (contact: marketwithpmo@gmail.com)"
TERMS = ["Kangbashi new area", "unfinished building China",
         "China residential construction cranes", "Evergrande building",
         "ghost city China"]

os.makedirs("stock", exist_ok=True)
idx, seen = [], set()
for term in TERMS:
    url = ("https://commons.wikimedia.org/w/api.php?action=query&generator=search"
           f"&gsrsearch={urllib.parse.quote(term)}&gsrnamespace=6&gsrlimit=6"
           "&prop=imageinfo&iiprop=url%7Cextmetadata%7Csize&iiurlwidth=2000&format=json")
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    try:
        d = json.load(urllib.request.urlopen(req, timeout=60))
    except Exception as e:
        print("search failed", term, e); continue
    for p in ((d.get("query") or {}).get("pages") or {}).values():
        ii = (p.get("imageinfo") or [{}])[0]
        u = ii.get("thumburl") or ii.get("url")
        if not u or not u.lower().split("?")[0].endswith((".jpg", ".jpeg")): continue
        if ii.get("width", 0) < 1200 or p["title"] in seen: continue
        em = ii.get("extmetadata") or {}
        idx.append({"title": p["title"], "url": u,
                    "license": (em.get("LicenseShortName") or {}).get("value", ""),
                    "artist": (em.get("Artist") or {}).get("value", "")[:200],
                    "w": ii.get("width"), "h": ii.get("height"), "term": term})
        seen.add(p["title"])

for i, e in enumerate(idx[:16]):
    fn = f"stock/cand_{i:02d}.jpg"
    try:
        subprocess.run(["curl", "-fsSL", "-A", UA, "-o", fn, e["url"]],
                       check=True, timeout=120)
        e["file"] = fn
    except Exception:
        e["file"] = None
json.dump(idx, open("stock/index.json", "w"), indent=1)
print("downloaded", sum(1 for e in idx if e.get("file")))
