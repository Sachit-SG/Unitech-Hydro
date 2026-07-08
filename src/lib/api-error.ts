import { NextResponse } from "next/server";
import { ValidationError } from "@/lib/validation-error";

export function apiErrorResponse(
  err: unknown,
  logLabel: string,
  fallbackStatus = 500,
): NextResponse {
  if (err instanceof ValidationError) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  console.error(`[${logLabel}]`, err);
  return NextResponse.json(
    { error: "Something went wrong. Please try again." },
    { status: fallbackStatus },
  );
}
