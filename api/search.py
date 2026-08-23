from http.server import BaseHTTPRequestHandler
import json
from urllib.parse import parse_qs, urlparse
import requests


class handler(BaseHTTPRequestHandler):

  def do_GET(self):
    parsed_path = urlparse(self.path)
    query_params = parse_qs(parsed_path.query)
    username = (
        query_params.get("username", [""])[0] if "username" in query_params else ""
    )

    self.send_response(200)
    self.send_header("Content-type", "application/json")
    self.send_header("Access-Control-Allow-Origin", "*")
    self.end_headers()

    if not username:
      self.wfile.write(
          json.dumps({"error": "Kullanıcı adı gerekli"}).encode("utf-8")
      )
      return

    # Gerçek HTTP istekleriyle taranacak platformlar
    platforms = {
        "GitHub": f"https://github.com/{username}",
        "Reddit": f"https://www.reddit.com/user/{username}",
        "TikTok": f"https://www.tiktok.com/@{username}",
        "Telegram": f"https://t.me/{username}",
        "X (Twitter)": f"https://twitter.com/{username}",
    }

    results = []
    headers = {
        "User-Agent": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
            " (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        )
    }

    for name, url in platforms.items():
      try:
        response = requests.get(url, headers=headers, timeout=4)
        exists = response.status_code == 200
        results.append({"platform": name, "url": url, "exists": exists})
      except:
        results.append({"platform": name, "url": url, "exists": False})

    output = {"username": username, "results": results}
    self.wfile.write(json.dumps(output).encode("utf-8"))
    return
