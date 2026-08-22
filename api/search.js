export default async function handler(req, res) {
  const { username } = req.query;
  
  if (!username) {
    return res.status(400).json({ error: 'Lütfen bir kullanıcı adı girin.' });
  }

  // Eklenmesini istediğin tüm popüler platformlar
  const platforms = [
    { name: 'Instagram', url: `https://www.instagram.com/${username}/` },
    { name: 'TikTok', url: `https://www.tiktok.com/@${username}` },
    { name: 'Snapchat', url: `https://www.snapchat.com/add/${username}` },
    { name: 'GitHub', url: `https://github.com/${username}` },
    { name: 'Reddit', url: `https://www.reddit.com/user/${username}` },
    { name: 'Twitter / X', url: `https://twitter.com/${username}` },
    { name: 'Pinterest', url: `https://tr.pinterest.com/${username}/` },
    { name: 'Roblox', url: `https://www.roblox.com/user.aspx?username=${username}` }
  ];

  const results = [];

  for (const platform of platforms) {
    try {
      const response = await fetch(platform.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });
      
      // Sadece HTTP 200 dönen (yani gerçekten aktif olan) hesapları listeye ekliyoruz
      if (response.status === 200) {
        results.push({ platform: platform.name, url: platform.url, found: true });
      }
    } catch (error) {
      // Hata veren veya bulunamayanları sessizce atlıyoruz (ekranda görünmeyecek)
    }
  }

  // Sadece bulunanları gönderiyoruz
  res.status(200).json(results);
}
