import crypto from 'crypto';

export default async function handler(req, res) {
  const { query, type } = req.query;
  
  if (!query) {
    return res.status(400).json({ error: 'Sorgu değeri gerekli.' });
  }

  const cleanQuery = query.trim();
  const results = [];

  // 1. E-posta / Gravatar Gerçek Canlı Kontrolü
  if (type === 'email' || cleanQuery.includes('@')) {
    const emailToCheck = cleanQuery.toLowerCase();
    const emailHash = crypto.createHash('md5').update(emailToCheck).digest('hex');
    
    let exists = false;
    try {
      const gravRes = await fetch(`https://www.gravatar.com/${emailHash}.json`);
      exists = gravRes.ok;
    } catch (e) {}

    if (exists) {
      results.push({
        platform: 'Gravatar (E-posta Kaydı)',
        url: `https://gravatar.com/${emailHash}`,
        icon: 'fa-solid fa-envelope-circle-check',
        displayName: emailToCheck,
        stats: 'Aktif Profil',
        bio: 'Bu e-posta adresine bağlı açık Gravatar hesabı doğrulandı.'
      });
    }
  }

  // 2. Telefon Numarası
  if (type === 'phone') {
    const cleanPhone = cleanQuery.replace(/\D/g, '');
    results.push({
      platform: 'WhatsApp',
      url: `https://wa.me/${cleanPhone}`,
      icon: 'fa-brands fa-whatsapp',
      displayName: `+${cleanPhone}`,
      stats: 'Doğrudan Bağlantı',
      bio: 'WhatsApp iletişim yönlendirmesi.'
    });
  }

  // 3. Kullanıcı Adı ile Sorgular (GitHub ve YouTube)
  if (type === 'username') {
    // GitHub Canlı API Sorgusu
    try {
      const ghRes = await fetch(`https://api.github.com/users/${cleanQuery}`);
      if (ghRes.ok) {
        const ghData = await ghRes.json();
        results.push({
          platform: 'GitHub (Canlı Veri)',
          url: ghData.html_url,
          icon: 'fa-brands fa-github',
          displayName: ghData.name || ghData.login,
          stats: `${ghData.public_repos} Repo • ${ghData.followers} Takipçi`,
          bio: ghData.bio || 'Biyografi belirtilmemiş.'
        });
      }
    } catch (e) {}

    // YouTube Canlı oEmbed Kontrolü
    try {
      const ytRes = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/@${cleanQuery}&format=json`);
      if (ytRes.ok) {
        const ytData = await ytRes.json();
        results.push({
          platform: 'YouTube (Canlı Kanal)',
          url: `https://www.youtube.com/@${cleanQuery}`,
          icon: 'fa-brands fa-youtube',
          displayName: ytData.author_name || cleanQuery,
          stats: 'Doğrulanmış Kanal',
          bio: ytData.title || 'YouTube Video Kanalı'
        });
      }
    } catch (e) {}
  }

  res.status(200).json(results);
}
