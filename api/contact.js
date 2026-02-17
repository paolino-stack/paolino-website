export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    const { name, email, demo_link, message } = req.body || {};

    const text =
      "Nuova richiesta dal sito\n" +
      "Nome: " + (name || "-") + "\n" +
      "Email: " + (email || "-") + "\n" +
      "Demo: " + (demo_link || "-") + "\n\n" +
      (message || "-");

    const token = process.env.TG_BOT_TOKEN;
    const chatId = process.env.TG_CHAT_ID;

    if (!token || !chatId) {
      return res.status(500).json({ ok: false, error: "Telegram not configured" });
    }

    const tgResp = await fetch(`https://api.telegram.org/bot${8370901993:AAEvg5nIbgNTogQojXtehQCfaq6G0GDcnM8
}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        disable_web_page_preview: true
      })
    });

    const tgData = await tgResp.json();
    if (!tgData.ok) {
      return res.status(500).json({ ok: false, error: "Telegram send failed", details: tgData });
    }

    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ ok: false, error: "Server error" });
  }
}
