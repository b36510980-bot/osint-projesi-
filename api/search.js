export default async function handler(req, res) {
  const { username } = req.query;
  
  if (!username) {
    return res.status(400).json({ error: 'Kullanıcı adı gerekli.' });
  }

  const platforms = [
    { name: 'Instagram', url: `https://www.instagram.com/${username}/`, icon: 'fa-brands fa-instagram' },
    { name: 'TikTok', url: `https://www.tiktok.com/@${username}`, icon: 'fa-brands fa-tiktok' },
    { name: 'Snapchat', url: `https://www.snapchat.com/add/${username}`, icon: 'fa-brands fa-snapchat' },
    { name: 'GitHub', url: `https://github.com/${username}`, icon: 'fa-brands fa-github' },
    { name: 'Reddit', url: `https://www.reddit.com/user/${username}`, icon: 'fa-brands fa-reddit' },
    { name: 'Twitter / X', url: `https://twitter.com/${username}`, icon: 'fa-brands fa-x-twitter' },
    { name: 'Pinterest', url: `https://tr.pinterest.com/${username}/`, icon: 'fa-brands fa-pinterest' },
    { name: 'Roblox', url: `https://www.roblox.com/user.aspx?username=${username}`, icon: 'fa-solid fa-cube' }
  ];

  const results = [];

  for (const platform of platforms) {
    try {
      const response = await fetch(platform.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      });
      
      if (response.status === 200) {
        results.push({ 
          platform: platform.name, 
          url: platform.url, 
          icon: platform.icon 
        });
      }
    } catch (error) {
      // Hata durumunda atla
    }
  }

  res.status(200).json(results);
}
