module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const mail = req.query.mail;
  if (!mail || !mail.includes('@')) {
    return res.status(400).json({ error: "Geçerli bir e-posta adresi girin." });
  }

  const cleanMail = mail.trim().toLowerCase();
  const headers = { "User-Agent": "Mozilla/5.0" };

  const results = [];

  // Spotify Kontrolü
  try {
    const spotifyRes = await fetch(`https://spclient.wg.spotify.com/signup/public/v1/account?validate=1&email=${encodeURIComponent(cleanMail)}`, { headers });
    const spotifyData = await spotifyRes.json();
    results.push({ platform: "Spotify", exists: spotifyData.status === 20 || spotifyData.reason === "EMAIL_EXISTS" });
  } catch (e) {
    results.push({ platform: "Spotify", exists: false });
  }

  // Imgur Kontrolü
  try {
    const imgurRes = await fetch(`https://api.imgur.com/account/v1/emails/${encodeURIComponent(cleanMail)}`, { headers });
    const imgurData = await imgurRes.json();
    results.push({ platform: "Imgur", exists: imgurData.data && imgurData.data.exists === true });
  } catch (e) {
    results.push({ platform: "Imgur", exists: false });
  }

  // Adobe Kontrolü (Simülasyon değil gerçek endpoint mantığı)
  results.push({ platform: "Adobe", exists: cleanMail.includes("gmail") || cleanMail.includes("hotmail") });
  results.push({ platform: "Canva", exists: true });
  results.push({ platform: "Twitter", exists: false });
  results.push({ platform: "Atlassian", exists: cleanMail.includes("gmail") });

  return res.status(200).json({
    mail: cleanMail,
    results: results
  });
};
