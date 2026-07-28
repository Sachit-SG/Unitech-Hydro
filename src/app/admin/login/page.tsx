"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { type FormEvent, Suspense, useState } from "react";
import { safeAdminRedirectPath } from "@/lib/safe-admin-path";

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = safeAdminRedirectPath(searchParams.get("next"));

  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Login failed");
      router.replace(next);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-blue-deep px-4">
      <form
        onSubmit={(e) => void handleSubmit(e)}
        className="w-full max-w-sm rounded-[4px] border border-white/10 bg-brand-blue p-8 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.45)]"
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-cyan">
          Unitech
        </p>
        <h1 className="mt-2 font-heading text-2xl font-bold tracking-tight text-white">
          Admin sign in
        </h1>
        <div className="mt-6 space-y-1.5">
          <label htmlFor="admin-password" className="block text-sm text-white/70">
            Password
          </label>
          <input
            id="admin-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="h-10 w-full rounded-[4px] border border-white/15 bg-brand-blue-deep/60 px-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan"
          />
        </div>
        {error ? <p className="mt-3 text-sm text-status-fault">{error}</p> : null}
        <button
          type="submit"
          disabled={loading}
          className="mt-6 h-10 w-full rounded-[4px] bg-brand-cyan text-sm font-semibold text-brand-blue hover:bg-brand-cyan/90 disabled:opacity-50"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-brand-blue-deep text-sm text-white/60">
          Loading…
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
