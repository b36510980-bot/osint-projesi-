module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const username = req.query.username;
  if (!username) {
    return res.status(400).json({ error: "Kullanıcı adı gerekli" });
  }

  // Sherlock mantığıyla taranacak gerçek platform listesi ve URL yapıları
  const platforms = {
    "GitHub": `https://github.com/${username}`,
    "Instagram": `https://www.instagram.com/${username}/`,
    "TikTok": `https://www.tiktok.com/@${username}`,
    "Twitter (X)": `https://twitter.com/${username}`,
    "Reddit": `https://www.reddit.com/user/${username}`,
    "Telegram": `https://t.me/${username}`,
    "Steam": `https://steamcommunity.com/id/${username}`,
    "Pinterest": `https://pinterest.com/${username}`,
    "SoundCloud": `https://soundcloud.com/${username}`,
    "Spotify": `https://open.spotify.com/user/${username}`
  };

  const headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
  };

  // Tüm platformlara aynı anda (eşzamanlı) gerçek istek atıyoruz
  const results = await Promise.all(
    Object.entries(platforms).map(async ([name, url]) => {
      try {
        const response = await fetch(url, { headers, redirect: 'follow' });
        // 200 dönüyorsa hesap %100 gerçektir ve aktiftir
        const exists = response.status === 200;
        return { platform: name, url, exists };
      } catch (e) {
        return { platform: name, url, exists: false };
      }
    })
  );

  return res.status(200).json({
    username: username,
    results: results
  });
};

