import Image from "next/image";
import { cn } from "@/lib/utils";

/** Matches Gallery → Board of Directors portrait tiles */
const PORTRAIT_PLACEHOLDER =
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80";

export type LeadershipMember = {
  name: string;
  title: string;
  /** Official portrait path under /public — omit until supplied */
  photoSrc?: string;
};

export function LeadershipProfileCard({ member }: { member: LeadershipMember }) {
  return (
    <article className="group overflow-hidden rounded-[4px] border border-slate-200/80 bg-white shadow-sm transition-[border-color,box-shadow] hover:border-brand-cyan/60 hover:shadow-[0_0_0_1px_rgba(0,210,255,0.35)]">
      <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
        <Image
          src={member.photoSrc ?? PORTRAIT_PLACEHOLDER}
          alt={member.photoSrc ? `${member.name}, ${member.title}` : ""}
          role={member.photoSrc ? undefined : "presentation"}
          fill
          className="object-cover object-[center_20%] transition-transform duration-300 group-hover:scale-[1.03]"
          sizes="(min-width: 1024px) 20vw, 50vw"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 to-transparent"
          aria-hidden
        />
      </div>
      <div className="p-6">
        <p className="font-heading text-lg font-bold text-brand-blue">{member.name}</p>
        <p className="mt-1 font-sans text-sm font-medium text-brand-slate/70">
          {member.title}
        </p>
      </div>
    </article>
  );
}

export function LeadershipGrid({
  members,
  className,
}: {
  members: readonly LeadershipMember[];
  className?: string;
}) {
  return (
    <div className={cn("grid gap-8 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {members.map((member) => (
        <LeadershipProfileCard key={member.name} member={member} />
      ))}
    </div>
  );
}
