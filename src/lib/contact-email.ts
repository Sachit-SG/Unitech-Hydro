import "server-only";

export const CONTACT_TO_EMAIL =
  process.env.CONTACT_TO_EMAIL?.trim() || "unitechhydropower@gmail.com";

export const CONTACT_FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL?.trim() ||
  "Unitech Hydropower <onboarding@resend.dev>";

export type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type SendContactResult =
  | { ok: true }
  | { ok: false; error: string; status: number };

export async function sendSubscribeNotification(email: string): Promise<SendContactResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return {
      ok: false,
      error: "Email service is not configured on the server.",
      status: 503,
    };
  }

  const text = [
    "A visitor subscribed to project updates from the website footer.",
    "",
    `Email: ${email}`,
    "",
    "Add this address to your newsletter or mailing list.",
  ].join("\n");

  const html = `
    <p>A visitor subscribed to project updates from the website footer.</p>
    <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
    <p style="color:#64748b;font-size:12px">Sent from unitechhydropower.com footer</p>
  `.trim();

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: CONTACT_FROM_EMAIL,
      to: [CONTACT_TO_EMAIL],
      reply_to: email,
      subject: "[Website] Newsletter subscription",
      text,
      html,
    }),
  });

  if (!response.ok) {
    let detail = "Could not complete subscription.";
    try {
      const data = (await response.json()) as { message?: string };
      if (data.message) detail = data.message;
    } catch {
      // ignore
    }
    return { ok: false, error: detail, status: 502 };
  }

  return { ok: true };
}

export async function sendContactEmail(payload: ContactPayload): Promise<SendContactResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return {
      ok: false,
      error: "Contact email is not configured on the server.",
      status: 503,
    };
  }

  const { name, email, subject, message } = payload;
  const mailSubject = subject || `Website enquiry from ${name}`;

  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    "",
    message,
    "",
    "---",
    "Sent from unitechhydropower.com contact form",
  ].join("\n");

  const html = `
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
    <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
    <hr />
    <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
    <hr />
    <p style="color:#64748b;font-size:12px">Sent from unitechhydropower.com contact form</p>
  `.trim();

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: CONTACT_FROM_EMAIL,
      to: [CONTACT_TO_EMAIL],
      reply_to: email,
      subject: `[Website] ${mailSubject}`,
      text,
      html,
    }),
  });

  if (!response.ok) {
    let detail = "Failed to send message.";
    try {
      const data = (await response.json()) as { message?: string };
      if (data.message) detail = data.message;
    } catch {
      // ignore parse errors
    }
    return { ok: false, error: detail, status: 502 };
  }

  return { ok: true };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
