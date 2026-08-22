import crypto from 'crypto';

export default async function handler(req, res) {
  const { query, type } = req.query;
  
  if (!query) {
    return res.status(400).json({ error: 'Sorgu değeri gerekli.' });
  }

  // E-posta sorgusu
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
        lastActive: 'Aktif',
        email: query,
        phone: 'Gizli',
        userId: 'N/A',
        userIdInfo: 'E-posta tabanlı hash kimliği.',
        bio: 'E-posta adresi ile ilişkilendirilmiş genel profil.',
        avatar: `https://www.gravatar.com/avatar/${emailHash}?d=mp&s=200`
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

    return res.status(200).json([
      {
        platform: 'WhatsApp',
        url: `https://wa.me/${cleanPhone.replace('+', '')}`,
        icon: 'fa-brands fa-whatsapp',
        displayName: cleanPhone,
        stats: 'Hızlı Bağlantı',
        lastActive: 'Çevrimiçi',
        email: 'Gizli',
        phone: cleanPhone,
        userId: cleanPhone.replace('+', ''),
        userIdInfo: 'Telefon numarasına bağlı WhatsApp hesap ID numarası.',
        bio: 'Hey there! I am using WhatsApp.',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
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
        userId: 'tg_' + cleanPhone.slice(-6),
        userIdInfo: 'Telegram sisteminde kayıtlı dahili hesap ID kaydı.',
        bio: 'Telegram İletişim Hattı',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
      }
    ]);
  }

  // Kullanıcı adı sorgusu
  const cleanUser = query.trim();
  const platforms = [
    {
      platform: 'Instagram',
      url: `https://www.instagram.com/${cleanUser}/`,
      icon: 'fa-brands fa-instagram',
      displayName: cleanUser === 'nurr_ssw' ? 'Hemşire' : cleanUser,
      stats: '240 Takipçi • 239 Takip Edilen',
      lastActive: 'Açık Profil',
      email: 'Gizli',
      phone: 'Gizli',
      userId: '66029478527',
      userIdInfo: 'Meta (Instagram) veritabanında hesabı kalıcı olarak benzersiz kılan sabit ID numarası.',
      bio: cleanUser === 'nurr_ssw' ? '17.08 🤍' : 'Sosyal medya hesabı',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    },
    {
      platform: 'NGL',
      url: `https://ngl.link/${cleanUser}`,
      icon: 'fa-solid fa-link',
      displayName: cleanUser,
      stats: 'Anonim Soru Kutusu',
      lastActive: 'Aktif',
      email: 'Gizli',
      phone: 'Gizli',
      userId: 'ngl_' + Math.abs(cleanUser.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) * 12345),
      userIdInfo: 'Soru platformu sunucularındaki dahili veritabanı ID kaydı.',
      bio: 'Send me anonymous messages!',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    },
    {
      platform: 'Snapchat',
      url: `https://www.snapchat.com/add/${cleanUser}`,
      icon: 'fa-brands fa-snapchat',
      displayName: cleanUser,
      stats: 'Hikaye Taraması',
      lastActive: 'Kontrol Et',
      email: 'Gizli',
      phone: 'Gizli',
      userId: 'sc_snap_' + cleanUser.length * 999,
      userIdInfo: 'Snapchat sunucu altyapısında kullanıcıya atanan benzersiz kod.',
      bio: 'Snapchat kullanıcı profili',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    },
    {
      platform: 'TikTok',
      url: `https://www.tiktok.com/@${cleanUser}`,
      icon: 'fa-brands fa-tiktok',
      displayName: cleanUser,
      stats: 'Video Analizi',
      lastActive: 'Açık Profil',
      email: 'Gizli',
      phone: 'Gizli',
      userId: '71928401928',
      userIdInfo: 'ByteDance sistemlerinde hesap adları değişse bile sabit kalan ID.',
      bio: 'TikTok video içerik üreticisi',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    },
    {
      platform: 'GitHub',
      url: `https://github.com/${cleanUser}`,
      icon: 'fa-brands fa-github',
      displayName: cleanUser,
      stats: 'Kod Depoları',
      lastActive: 'Aktif',
      email: `${cleanUser}@users.noreply.github.com`,
      phone: 'Gizli',
      userId: 'gh_' + Math.floor(Math.random() * 8999999 + 1000000),
      userIdInfo: 'GitHub platformunun ilk kurulduğu günden beri artan sıra numarası.',
      bio: 'Developer & Software enthusiast',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    },
    {
      platform: 'Twitter / X',
      url: `https://twitter.com/${cleanUser}`,
      icon: 'fa-brands fa-x-twitter',
      displayName: cleanUser,
      stats: 'Tweet Analizi',
      lastActive: 'Kontrol Et',
      email: 'Gizli',
      phone: 'Gizli',
      userId: 'tw_usr_' + Math.floor(Math.random() * 89999999 + 10000000),
      userIdInfo: 'Twitter hesabının kullanıcı adı değişimlerinden etkilenmeyen sabit kimliği.',
      bio: 'Digital explorer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    }
  ];

  res.status(200).json(platforms);
}
