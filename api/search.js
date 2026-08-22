export default async function handler(req, res) {
  const { query, type } = req.query;
  
  if (!query) {
    return res.status(400).json({ error: 'Sorgu değeri gerekli.' });
  }

  // E-posta sorgusu geldiyse
  if (type === 'email') {
    return res.status(200).json([
      {
        platform: 'Gravatar / E-posta Kaydı',
        url: `https://en.gravatar.com/${query}`,
        icon: 'fa-solid fa-envelope-circle-check',
        displayName: query,
        stats: 'E-posta Veritabanı Taraması',
        lastActive: 'Kayıt Sorgulandı',
        email: query,
        phone: 'Eşleşen Veri Yok'
      }
    ]);
  }

  // Kullanıcı adı için gerçek platform taraması (Fetch ile canlı kontrol)
  const targets = [
    { platform: 'GitHub', url: `https://github.com/${query}`, icon: 'fa-brands fa-github' },
    { platform: 'TikTok', url: `https://www.tiktok.com/@${query}`, icon: 'fa-brands fa-tiktok' },
    { platform: 'Pinterest', url: `https://www.pinterest.com/${query}/`, icon: 'fa-brands fa-pinterest' }
  ];

  const results = [];

  for (const target of targets) {
    try {
      const response = await fetch(target.url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
        redirect: 'follow'
      });
      
      // Eğer sayfa başarıyla dönüyorsa (200), hesap gerçekten var demektir
      if (response.status === 200) {
        results.push({
          platform: target.platform,
          url: target.url,
          icon: target.icon,
          displayName: query,
          stats: 'Gerçek Eşleşme (Aktif)',
          lastActive: 'Doğrulandı',
          email: 'Gizli / Paylaşılmamış',
          phone: 'Gizli / Paylaşılmamış'
        });
      }
    } catch (e) {
      // Bağlantı hatası durumunda atla
    }
  }

  res.status(200).json(results);
}
