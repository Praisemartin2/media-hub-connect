#!/usr/bin/env python3
"""One-time TikTok authorization helper. Run on YOUR computer:

    python3 tiktok_auth.py CLIENT_KEY CLIENT_SECRET

It prints the authorization URL — open it, log in as @ekabohome, approve,
then paste the full redirect URL back here. It prints the refresh token to
store as the TIKTOK_REFRESH_TOKEN repo secret.
"""
import json, sys, urllib.parse, urllib.request

if len(sys.argv) != 3:
    print(__doc__); sys.exit(1)
key, secret = sys.argv[1], sys.argv[2]
redirect = "https://ekabohome.com/"  # must match a Redirect URI registered on the app

url = ("https://www.tiktok.com/v2/auth/authorize/?" + urllib.parse.urlencode({
    "client_key": key, "response_type": "code",
    "scope": "user.info.basic,video.list",
    "redirect_uri": redirect, "state": "ekabostats"}))
print("\n1. Open this URL in your browser and approve:\n\n" + url)
pasted = input("\n2. After approving you land on ekabohome.com with ?code=... in the "
               "address bar.\n   Paste that FULL address here: ").strip()
code = urllib.parse.parse_qs(urllib.parse.urlparse(pasted).query)["code"][0]

body = urllib.parse.urlencode({
    "client_key": key, "client_secret": secret, "code": code,
    "grant_type": "authorization_code", "redirect_uri": redirect}).encode()
req = urllib.request.Request("https://open.tiktokapis.com/v2/oauth/token/", data=body,
    headers={"Content-Type": "application/x-www-form-urlencoded"})
with urllib.request.urlopen(req, timeout=60) as r:
    tok = json.load(r)
if "refresh_token" not in tok:
    print("Failed:", tok); sys.exit(1)
print("\nSuccess! Add these three GitHub repo secrets "
      "(Settings > Secrets and variables > Actions):")
print("  TIKTOK_CLIENT_KEY     =", key)
print("  TIKTOK_CLIENT_SECRET  =", secret)
print("  TIKTOK_REFRESH_TOKEN  =", tok["refresh_token"])
