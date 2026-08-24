module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const mail = req.query.mail;
  if (!mail || !mail.includes('@')) {
    return res.status(400).json({ error: "Geçerli bir e-posta adresi girin." });
  }

  const cleanMail = mail.trim().toLowerCase();
  const headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    "Accept": "application/json"
  };

  const results = [];

  // 1. Spotify Gerçek Kayıt API Sorgusu
  try {
    const spotifyRes = await fetch(`https://spclient.wg.spotify.com/signup/public/v1/account?validate=1&email=${encodeURIComponent(cleanMail)}`, { headers });
    const spotifyData = await spotifyRes.json();
    const exists = spotifyData.status === 20 || spotifyData.reason === "EMAIL_EXISTS";
    results.push({ platform: "Spotify", exists: exists });
  } catch (e) {
    results.push({ platform: "Spotify", exists: false });
  }

  // 2. Imgur Gerçek E-posta Sorgu API'si
  try {
    const imgurRes = await fetch(`https://api.imgur.com/account/v1/emails/${encodeURIComponent(cleanMail)}`, { headers });
    const imgurData = await imgurRes.json();
    const exists = imgurData.data && imgurData.data.exists === true;
    results.push({ platform: "Imgur", exists: exists });
  } catch (e) {
    results.push({ platform: "Imgur", exists: false });
  }

  return res.status(200).json({
    mail: cleanMail,
    results: results
  });
};
