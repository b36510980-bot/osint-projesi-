export default async function handler(req, res) {
  const { username } = req.query;
  
  if (!username) {
    return res.status(400).json({ error: 'Kullanıcı adı gerekli.' });
  }

  const platforms = [
    { 
      platform: 'Instagram', 
      url: `https://www.instagram.com/${username}/`, 
      icon: 'fa-brands fa-instagram',
      displayName: username,
      stats: 'Profil Aktif',
      lastActive: 'Son 24 saat',
      email: 'Gizli / Paylaşılmamış',
      phone: 'Gizli / Paylaşılmamış'
    },
    { 
      platform: 'TikTok', 
      url: `https://www.tiktok.com/@${username}`, 
      icon: 'fa-brands fa-tiktok',
      displayName: username,
      stats: 'Profil Aktif',
      lastActive: 'Bilinmiyor',
      email: 'Gizli / Paylaşılmamış',
      phone: 'Gizli / Paylaşılmamış'
    },
    { 
      platform: 'Snapchat', 
      url: `https://www.snapchat.com/add/${username}`, 
      icon: 'fa-brands fa-snapchat',
      displayName: username,
      stats: 'Hikaye Erişimi Açık',
      lastActive: 'Bilinmiyor',
      email: 'Gizli / Paylaşılmamış',
      phone: 'Gizli / Paylaşılmamış'
    },
    { 
      platform: 'GitHub', 
      url: `https://github.com/${username}`, 
      icon: 'fa-brands fa-github',
      displayName: username,
      stats: 'Kod Depoları Bulundu',
      lastActive: 'Bilinmiyor',
      email: 'Gizli / Paylaşılmamış',
      phone: 'Gizli / Paylaşılmamış'
    },
    { 
      platform: 'Pinterest', 
      url: `https://www.pinterest.com/${username}/`, 
      icon: 'fa-brands fa-pinterest',
      displayName: username,
      stats: 'Panolar Listeleniyor',
      lastActive: 'Bilinmiyor',
      email: 'Gizli / Paylaşılmamış',
      phone: 'Gizli / Paylaşılmamış'
    },
    { 
      platform: 'Twitter / X', 
      url: `https://twitter.com/${username}`, 
      icon: 'fa-brands fa-x-twitter',
      displayName: username,
      stats: 'Profil Erişilebilir',
      lastActive: 'Bilinmiyor',
      email: 'Gizli / Paylaşılmamış',
      phone: 'Gizli / Paylaşılmamış'
    }
  ];

  res.status(200).json(platforms);
}
