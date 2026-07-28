import { Suspense } from "react";
import { AdminCommandCenter } from "@/components/admin/admin-command-center";

function AdminPageFallback() {
  return (
    <div className="px-6 py-8 md:px-10">
      <div className="h-7 w-28 animate-pulse rounded-[4px] bg-cloud" />
      <div className="mt-6 h-48 animate-pulse rounded-[4px] border border-cloud bg-white" />
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
