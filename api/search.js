import crypto from 'crypto';

export default async function handler(req, res) {
  const { query, type } = req.query;
  
  if (!query) {
    return res.status(400).json({ error: 'Sorgu değeri gerekli.' });
  }

  // E-posta sorgusu (MD5 Hash düzeltmesi ile 404 hatası önlendi)
  if (type === 'email') {
    const cleanEmail = query.trim().toLowerCase();
    const emailHash = crypto.createHash('md5').update(cleanEmail).digest('hex');
    
    return res.status(200).json([
      {
        platform: 'Gravatar / E-posta Profili',
        url: `https://gravatar.com/${emailHash}`,
        icon: 'fa-solid fa-envelope-circle-check',
        displayName: query,
        stats: 'E-posta Hash Analizi',
        lastActive: 'Profil Linki Hazır',
        email: query,
        phone: 'Gizli / Paylaşılmamış',
        nationality: 'Bilinmiyor',
        city: 'Bilinmiyor',
        residence: 'Bilinmiyor',
        hometown: 'Bilinmiyor'
      }
    ]);
  }

  // Telefon sorgusu
  if (type === 'phone') {
    const cleanPhone = query.replace(/\s+/g, '');
    const isValidPhone = /^\+?[0-9]{10,14}$/.test(cleanPhone);

    if (!isValidPhone) {
      return res.status(200).json([]);
    }

    const isTr = cleanPhone.startsWith('90') || cleanPhone.startsWith('+90') || cleanPhone.length === 10;
    const nationality = isTr ? 'Türkiye (TR)' : 'Uluslararası';
    const cityArea = isTr ? 'Türkiye Operatör Kaydı' : 'Yurt Dışı';

    return res.status(200).json([
      {
        platform: 'WhatsApp',
        url: `https://wa.me/${cleanPhone.replace('+', '')}`,
        icon: 'fa-brands fa-whatsapp',
        displayName: cleanPhone,
        stats: 'Hızlı Bağlantı',
        lastActive: 'Sohbeti Başlat',
        email: 'Gizli',
        phone: cleanPhone,
        nationality: nationality,
        city: cityArea,
        residence: isTr ? 'Türkiye' : 'Bilinmiyor',
        hometown: 'Kişisel Veri (Gizli)'
      },
      {
        platform: 'Telegram',
        url: `https://t.me/+${cleanPhone.replace('+', '')}`,
        icon: 'fa-brands fa-telegram',
        displayName: cleanPhone,
        stats: 'Hızlı Bağlantı',
        lastActive: 'Kontrol Et',
        email: 'Gizli',
        phone: cleanPhone,
        nationality: nationality,
        city: cityArea,
        residence: isTr ? 'Türkiye' : 'Bilinmiyor',
        hometown: 'Kişisel Veri (Gizli)'
      },
      {
        platform: 'Truecaller',
        url: `https://www.truecaller.com/search/tr/${cleanPhone.replace('+', '')}`,
        icon: 'fa-solid fa-address-book',
        displayName: cleanPhone,
        stats: 'Rehber Analizi',
        lastActive: 'Web Üzerinden Sorgula',
        email: 'Gizli',
        phone: cleanPhone,
        nationality: nationality,
        city: cityArea,
        residence: isTr ? 'Türkiye' : 'Bilinmiyor',
        hometown: 'Kişisel Veri (Gizli)'
      }
    ]);
  }

  // Kullanıcı adı sorgusu
  const platforms = [
    { platform: 'Instagram', url: `https://www.instagram.com/${query}/`, icon: 'fa-brands fa-instagram', displayName: query, stats: 'Profil Taraması', lastActive: 'Kontrol Et', email: 'Gizli', phone: 'Gizli', nationality: 'Bilinmiyor', city: 'Bilinmiyor', residence: 'Bilinmiyor', hometown: 'Bilinmiyor' },
    { platform: 'TikTok', url: `https://www.tiktok.com/@${query}`, icon: 'fa-brands fa-tiktok', displayName: query, stats: 'Profil Taraması', lastActive: 'Kontrol Et', email: 'Gizli', phone: 'Gizli', nationality: 'Bilinmiyor', city: 'Bilinmiyor', residence: 'Bilinmiyor', hometown: 'Bilinmiyor' },
    { platform: 'Snapchat', url: `https://www.snapchat.com/add/${query}`, icon: 'fa-brands fa-snapchat', displayName: query, stats: 'Profil Taraması', lastActive: 'Kontrol Et', email: 'Gizli', phone: 'Gizli', nationality: 'Bilinmiyor', city: 'Bilinmiyor', residence: 'Bilinmiyor', hometown: 'Bilinmiyor' },
    { platform: 'GitHub', url: `https://github.com/${query}`, icon: 'fa-brands fa-github', displayName: query, stats: 'Kod Depoları', lastActive: 'Kontrol Et', email: 'Gizli', phone: 'Gizli', nationality: 'Bilinmiyor', city: 'Bilinmiyor', residence: 'Bilinmiyor', hometown: 'Bilinmiyor' },
    { platform: 'Pinterest', url: `https://www.pinterest.com/${query}/`, icon: 'fa-brands fa-pinterest', displayName: query, stats: 'Pano Taraması', lastActive: 'Kontrol Et', email: 'Gizli', phone: 'Gizli', nationality: 'Bilinmiyor', city: 'Bilinmiyor', residence: 'Bilinmiyor', hometown: 'Bilinmiyor' },
    { platform: 'Twitter / X', url: `https://twitter.com/${query}`, icon: 'fa-brands fa-x-twitter', displayName: query, stats: 'Profil Taraması', lastActive: 'Kontrol Et', email: 'Gizli', phone: 'Gizli', nationality: 'Bilinmiyor', city: 'Bilinmiyor', residence: 'Bilinmiyor', hometown: 'Bilinmiyor' }
  ];

  res.status(200).json(platforms);
}
