const NOTIFICATION_TO = "yfjelley@gmail.com";
const NOTIFICATION_FROM = "brief@pddjf.com";
const MAX_SUBJECT_LENGTH = 240;
const MAX_TEXT_LENGTH = 20_000;

function cleanString(value, maxLength) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function json(body, status = 200) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" }
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method !== "POST" || url.pathname !== "/notify") {
      return json({ ok: false, code: "NOT_FOUND", error: "not_found" }, 404);
    }

    let payload;
    try {
      payload = await request.json();
    } catch {
      return json({ ok: false, code: "INVALID_PAYLOAD", error: "invalid_payload" }, 400);
    }

    const to = cleanString(payload?.to, 320);
    const fromEmail = cleanString(payload?.from?.email, 320);
    const fromName = cleanString(payload?.from?.name, 120);
    const replyTo = cleanString(payload?.replyTo, 320);
    const subject = cleanString(payload?.subject, MAX_SUBJECT_LENGTH);
    const text = cleanString(payload?.text, MAX_TEXT_LENGTH);

    if (to !== NOTIFICATION_TO || fromEmail !== NOTIFICATION_FROM || !subject || !text) {
      return json({ ok: false, code: "INVALID_NOTIFICATION", error: "invalid_notification" }, 400);
    }
    if (replyTo && !isEmail(replyTo)) {
      return json({ ok: false, code: "INVALID_REPLY_TO", error: "invalid_reply_to" }, 400);
    }

    try {
      const result = await env.EMAIL.send({
        to,
        from: { email: fromEmail, name: fromName || "SignalCraft Labs Briefs" },
        ...(replyTo ? { replyTo } : {}),
        subject,
        text
      });
      return json({ ok: true, messageId: cleanString(result?.messageId, 200) });
    } catch (error) {
      console.error("email_send_failed", cleanString(error?.code, 100), cleanString(error?.message, 300));
      return json({
        ok: false,
        code: cleanString(error?.code, 100) || "EMAIL_SEND_FAILED",
        error: cleanString(error?.message, 300) || "email_send_failed"
      }, 502);
    }
  }
};
