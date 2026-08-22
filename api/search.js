export default async function handler(req, res) {
  const { query, type } = req.query;
  
  if (!query) {
    return res.status(400).json({ error: 'Sorgu değeri gerekli.' });
  }

  // E-posta sorgusu
  if (type === 'email') {
    return res.status(200).json([
      {
        platform: 'Gravatar / E-posta Kaydı',
        url: `https://en.gravatar.com/${query}`,
        icon: 'fa-solid fa-envelope-circle-check',
        displayName: query,
        stats: 'E-posta Kontrolü',
        lastActive: 'Manuel Sorgu Linki',
        email: query,
        phone: 'Gizli / Paylaşılmamış'
      }
    ]);
  }

  // Telefon sorgusu (Doğrudan uygulama kontrol linkleri üretir)
  if (type === 'phone') {
    const cleanPhone = query.replace(/\s+/g, '');
    const isValidPhone = /^\+?[0-9]{10,14}$/.test(cleanPhone);

    if (!isValidPhone) {
      return res.status(200).json([]);
    }

    return res.status(200).json([
      {
        platform: 'WhatsApp',
        url: `https://wa.me/${cleanPhone.replace('+', '')}`,
        icon: 'fa-brands fa-whatsapp',
        displayName: cleanPhone,
        stats: 'Hızlı Bağlantı',
        lastActive: 'Tıklayıp Sohbeti Başlat',
        email: 'Gizli / Paylaşılmamış',
        phone: cleanPhone
      },
      {
        platform: 'Telegram',
        url: `https://t.me/+${cleanPhone.replace('+', '')}`,
        icon: 'fa-brands fa-telegram',
        displayName: cleanPhone,
        stats: 'Hızlı Bağlantı',
        lastActive: 'Tıklayıp Kontrol Et',
        email: 'Gizli / Paylaşılmamış',
        phone: cleanPhone
      },
      {
        platform: 'Truecaller',
        url: `https://www.truecaller.com/search/tr/${cleanPhone.replace('+', '')}`,
        icon: 'fa-solid fa-address-book',
        displayName: cleanPhone,
        stats: 'Rehber Analizi',
        lastActive: 'Web Üzerinden Sorgula',
        email: 'Gizli / Paylaşılmamış',
        phone: cleanPhone
      }
    ]);
  }

  // Kullanıcı adı sorgusu
  const platforms = [
    { platform: 'Instagram', url: `https://www.instagram.com/${query}/`, icon: 'fa-brands fa-instagram', displayName: query, stats: 'Profil Taraması', lastActive: 'Kontrol Et', email: 'Gizli / Paylaşılmamış', phone: 'Gizli / Paylaşılmamış' },
    { platform: 'TikTok', url: `https://www.tiktok.com/@${query}`, icon: 'fa-brands fa-tiktok', displayName: query, stats: 'Profil Taraması', lastActive: 'Kontrol Et', email: 'Gizli / Paylaşılmamış', phone: 'Gizli / Paylaşılmamış' },
    { platform: 'Snapchat', url: `https://www.snapchat.com/add/${query}`, icon: 'fa-brands fa-snapchat', displayName: query, stats: 'Profil Taraması', lastActive: 'Kontrol Et', email: 'Gizli / Paylaşılmamış', phone: 'Gizli / Paylaşılmamış' },
    { platform: 'GitHub', url: `https://github.com/${query}`, icon: 'fa-brands fa-github', displayName: query, stats: 'Kod Depoları', lastActive: 'Kontrol Et', email: 'Gizli / Paylaşılmamış', phone: 'Gizli / Paylaşılmamış' },
    { platform: 'Pinterest', url: `https://www.pinterest.com/${query}/`, icon: 'fa-brands fa-pinterest', displayName: query, stats: 'Pano Taraması', lastActive: 'Kontrol Et', email: 'Gizli / Paylaşılmamış', phone: 'Gizli / Paylaşılmamış' },
    { platform: 'Twitter / X', url: `https://twitter.com/${query}`, icon: 'fa-brands fa-x-twitter', displayName: query, stats: 'Profil Taraması', lastActive: 'Kontrol Et', email: 'Gizli / Paylaşılmamış', phone: 'Gizli / Paylaşılmamış' }
  ];

  res.status(200).json(platforms);
}
