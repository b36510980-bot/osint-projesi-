export default async function handler(req, res) {
  const { query, type } = req.query;
  
  if (!query) {
    return res.status(400).json({ error: 'Sorgu değeri gerekli.' });
  }

  const cleanQuery = query.trim();
  const results = [];
  
  // Sunucu isteklerinin engellenmemesi için tarayıcı kimliği
  const fetchHeaders = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  };

  // 1. E-posta Sorgusu
  if (type === 'email') {
    return res.status(200).json([
      {
        platform: 'Gravatar / E-posta Kaydı',
        url: `https://en.gravatar.com/${cleanQuery}`,
        icon: 'fa-solid fa-envelope-circle-check',
        displayName: cleanQuery,
        stats: 'E-posta Veritabanı',
        lastActive: 'Hızlı Sorgu Linki',
        email: cleanQuery,
        phone: 'Gizli'
      }
    ]);
  }

  // 2. Telefon Sorgusu
  if (type === 'phone') {
    const cleanPhone = cleanQuery.replace(/\s+/g, '');
    const isValidPhone = /^\+?[0-9]{10,14}$/.test(cleanPhone);

    if (!isValidPhone) return res.status(200).json([]);

    return res.status(200).json([
      {
        platform: 'WhatsApp',
        url: `https://wa.me/${cleanPhone.replace('+', '')}`,
        icon: 'fa-brands fa-whatsapp',
        displayName: cleanPhone,
        stats: 'Hızlı Bağlantı',
        lastActive: 'Sohbeti Başlat',
        email: 'Gizli',
        phone: cleanPhone
      },
      {
        platform: 'Telegram',
        url: `https://t.me/+${cleanPhone.replace('+', '')}`,
        icon: 'fa-brands fa-telegram',
        displayName: cleanPhone,
        stats: 'Hızlı Bağlantı',
        lastActive: 'Kontrol Et',
        email: 'Gizli',
        phone: cleanPhone
      }
    ]);
  }

  // 3. Kullanıcı Adı Sorgusu (CANLI KONTROLLER)
  if (type === 'username') {
    
    // YouTube
    try {
      const ytRes = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/@${cleanQuery}&format=json`, { headers: fetchHeaders });
      if (ytRes.ok) {
        const ytData = await ytRes.json();
        results.push({
          platform: 'YouTube',
          url: `https://www.youtube.com/@${cleanQuery}`,
          icon: 'fa-brands fa-youtube',
          displayName: ytData.author_name || cleanQuery,
          stats: 'Kanal Bulundu',
          lastActive: 'Kanala Git',
          email: 'Gizli',
          phone: 'Gizli'
        });
      }
    } catch (e) {}

    // NGL (Gizli Soru Uygulaması)
    try {
      const nglRes = await fetch(`https://ngl.link/${cleanQuery}`, { headers: fetchHeaders });
      // NGL genellikle hesap yoksa 404 döndürür
      if (nglRes.ok) {
        results.push({
          platform: 'NGL',
          url: `https://ngl.link/${cleanQuery}`,
          icon: 'fa-solid fa-link', // NGL'nin özel ikonu olmadığı için link ikonu kullanıldı
          displayName: cleanQuery,
          stats: 'Soru Sayfası Bulundu',
          lastActive: 'Soru Sor',
          email: 'Gizli',
          phone: 'Gizli'
        });
      }
    } catch (e) {}

    // Snapchat
    try {
      const snapRes = await fetch(`https://www.snapchat.com/add/${cleanQuery}`, { headers: fetchHeaders });
      if (snapRes.ok) {
        results.push({
          platform: 'Snapchat',
          url: `https://www.snapchat.com/add/${cleanQuery}`,
          icon: 'fa-brands fa-snapchat',
          displayName: cleanQuery,
          stats: 'Profil Bulundu',
          lastActive: 'Profili İncele',
          email: 'Gizli',
          phone: 'Gizli'
        });
      }
    } catch (e) {}

    // Instagram (Bot korumasına takılma ihtimali var)
    try {
      const igRes = await fetch(`https://www.instagram.com/${cleanQuery}/`, { headers: fetchHeaders });
      if (igRes.ok) {
        results.push({
          platform: 'Instagram',
          url: `https://www.instagram.com/${cleanQuery}/`,
          icon: 'fa-brands fa-instagram',
          displayName: cleanQuery,
          stats: 'Profil Olabilir',
          lastActive: 'Kontrol Et',
          email: 'Gizli',
          phone: 'Gizli'
        });
      }
    } catch (e) {}

    // TikTok (Bot korumasına takılma ihtimali var)
    try {
      const tkRes = await fetch(`https://www.tiktok.com/@${cleanQuery}`, { headers: fetchHeaders });
      if (tkRes.ok) {
        results.push({
          platform: 'TikTok',
          url: `https://www.tiktok.com/@${cleanQuery}`,
          icon: 'fa-brands fa-tiktok',
          displayName: cleanQuery,
          stats: 'Profil Olabilir',
          lastActive: 'Kontrol Et',
          email: 'Gizli',
          phone: 'Gizli'
        });
      }
    } catch (e) {}

    // GitHub
    try {
      const ghRes = await fetch(`https://api.github.com/users/${cleanQuery}`, { headers: fetchHeaders });
      if (ghRes.ok) {
        const ghData = await ghRes.json();
        results.push({
          platform: 'GitHub',
          url: ghData.html_url,
          icon: 'fa-brands fa-github',
          displayName: ghData.name || ghData.login,
          stats: `${ghData.public_repos} Repo`,
          lastActive: 'Profili İncele',
          email: 'Gizli',
          phone: 'Gizli'
        });
      }
    } catch (e) {}
  }

  // Sadece doğrulanmış, gerçekten var olan (veya bot engelini aşan) sonuçları döndür
  res.status(200).json(results);
}
