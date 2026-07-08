import { NextResponse } from "next/server";
import { apiErrorResponse } from "@/lib/api-error";
import { sendSubscribeNotification } from "@/lib/contact-email";
import { enforceRateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SubscribeBody = {
  email?: string;
  company?: string;
};

export async function POST(request: Request) {
  try {
    const limit = await enforceRateLimit(request, "subscribe", 5, 60 * 60);
    if (!limit.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        {
          status: 429,
          headers: { "Retry-After": String(limit.retryAfterSeconds ?? 300) },
        },
      );
    }

    let body: SubscribeBody;
    try {
      body = (await request.json()) as SubscribeBody;
    } catch {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    if (body.company?.trim()) {
      return NextResponse.json({ ok: true });
    }

    const email = body.email?.trim() ?? "";
    if (!email || !EMAIL_RE.test(email) || email.length > 254) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const result = await sendSubscribeNotification(email);
    if (!result.ok) {
      console.error("[subscribe] resend failed", result.error);
      return NextResponse.json(
        { error: "Could not complete subscription. Please try again later." },
        { status: result.status },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return apiErrorResponse(err, "subscribe");
  }
}
