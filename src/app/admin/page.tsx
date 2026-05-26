import { Suspense } from "react";
import { AdminCommandCenter } from "@/components/admin/admin-command-center";

function AdminPageFallback() {
  return (
    <div className="min-h-full bg-slate-50 p-8">
      <div className="h-8 w-48 animate-pulse rounded-[4px] bg-slate-200" />
      <div className="mt-4 h-4 w-96 max-w-full animate-pulse rounded-[4px] bg-slate-200" />
      <div className="mt-8 h-11 w-full max-w-3xl animate-pulse rounded-[4px] bg-slate-200" />
    </div>
  );
}

export default function AdminPage() {
  return (
    <Suspense fallback={<AdminPageFallback />}>
      <AdminCommandCenter />
    </Suspense>
  );
}
