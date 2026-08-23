module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const mail = req.query.mail;
  if (!mail) {
    return res.status(400).json({ error: "Lütfen bir mail adresi girin." });
  }

  const domain = mail.split('@')[1] || 'bilinmiyor';
  let gecerliMi = true;
  let spamMi = false;
  let kurumsalMi = !['gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com', 'icloud.com'].includes(domain.toLowerCase());

  try {
    const response = await fetch(`https://api.eva.pingutil.com/email?email=${encodeURIComponent(mail)}`);
    const data = await response.json();
    
    if (data && data.data) {
      gecerliMi = data.data.deliverable;
      spamMi = data.data.spam;
      kurumsalMi = !data.data.webmail;
    }
  } catch (error) {
    // Dış servis hata verse bile sistem çökmez, yerel analiz devreye girer.
  }

  return res.status(200).json({
    mail: mail,
    domain: domain,
    gecerli_mi: gecerliMi,
    spam_mi: spamMi,
    kurumsal_mi: kurumsalMi
  });
};
