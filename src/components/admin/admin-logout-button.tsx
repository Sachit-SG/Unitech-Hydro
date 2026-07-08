"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AdminLogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.replace("/admin/login");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={() => void handleLogout()}
      disabled={loading}
      className="w-full justify-start gap-2 text-slate-400 hover:bg-white/5 hover:text-white"
    >
      <LogOut className="size-4" aria-hidden />
      {loading ? "Signing out…" : "Sign out"}
    </Button>
  );
}
