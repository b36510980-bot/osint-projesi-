export default async function handler(req, res) {
  const { username } = req.query;
  
  if (!username) {
    return res.status(400).json({ error: 'Lütfen bir kullanıcı adı girin.' });
  }

  const platforms = [
    { name: 'GitHub', url: `https://github.com/${username}` },
    { name: 'Reddit', url: `https://www.reddit.com/user/${username}` },
    { name: 'Roblox', url: `https://www.roblox.com/user.aspx?username=${username}` }
  ];

  const results = [];

  for (const platform of platforms) {
    try {
      const response = await fetch(platform.url);
      if (response.status === 200) {
        results.push({ platform: platform.name, url: platform.url, found: true });
      } else {
        results.push({ platform: platform.name, url: platform.url, found: false });
      }
    } catch (error) {
      results.push({ platform: platform.name, url: platform.url, found: false });
    }
  }

  res.status(200).json(results);
}

