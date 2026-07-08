import { NextResponse } from "next/server";
import { apiErrorResponse } from "@/lib/api-error";
import { sendContactEmail } from "@/lib/contact-email";
import { enforceRateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactBody = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  company?: string;
};

export async function POST(request: Request) {
  try {
    const limit = await enforceRateLimit(request, "contact", 5, 60 * 60);
    if (!limit.allowed) {
      return NextResponse.json(
        { error: "Too many messages sent. Please try again later." },
        {
          status: 429,
          headers: { "Retry-After": String(limit.retryAfterSeconds ?? 300) },
        },
      );
    }

    let body: ContactBody;
    try {
      body = (await request.json()) as ContactBody;
    } catch {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    if (body.company?.trim()) {
      return NextResponse.json({ ok: true });
    }

    const name = body.name?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const subject = body.subject?.trim() ?? "";
    const message = body.message?.trim() ?? "";

    if (!name || name.length > 120) {
      return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
    }
    if (!email || !EMAIL_RE.test(email) || email.length > 254) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }
    if (!subject || subject.length > 200) {
      return NextResponse.json({ error: "Please enter a subject." }, { status: 400 });
    }
    if (!message || message.length < 10 || message.length > 8000) {
      return NextResponse.json(
        { error: "Please enter a message (at least 10 characters)." },
        { status: 400 },
      );
    }

    const result = await sendContactEmail({ name, email, subject, message });
    if (!result.ok) {
      console.error("[contact] resend failed", result.error);
      return NextResponse.json(
        { error: "Could not send your message. Please email us directly." },
        { status: result.status },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return apiErrorResponse(err, "contact");
  }
}
