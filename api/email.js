export default async function handler(req, res) {
  const { mail } = req.query;

  if (!mail) {
    return res.status(400).json({ error: "Lütfen bir mail adresi girin." });
  }

  try {
    const response = await fetch(`https://api.eva.pingutil.com/email?email=${mail}`);
    const data = await response.json();

    res.status(200).json({
      mail: mail,
      domain: mail.split('@')[1],
      gecerli_mi: data.data.deliverable,
      spam_mi: data.data.spam,
      kurumsal_mi: !data.data.webmail 
    });

  } catch (error) {
    res.status(500).json({ error: "Arka plan sunucusunda hata oluştu." });
  }
}
