import Image from "next/image";
import { UserRound } from "lucide-react";
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

type LeadershipProfileCardProps = {
  member: LeadershipMember;
  variant: "board" | "management";
};

export function LeadershipProfileCard({ member, variant }: LeadershipProfileCardProps) {
  if (variant === "board") {
    return (
      <article className="group overflow-hidden rounded-[4px] border border-slate-200/80 bg-white shadow-sm transition-[border-color,box-shadow] hover:border-brand-cyan/60 hover:shadow-[0_0_0_1px_rgba(0,210,255,0.35)]">
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
          <Image
            src={member.photoSrc ?? PORTRAIT_PLACEHOLDER}
            alt={member.photoSrc ? `${member.name}, ${member.title}` : ""}
            role={member.photoSrc ? undefined : "presentation"}
            fill
            className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
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

  return (
    <article className="flex gap-5 rounded-[4px] border border-slate-200/80 bg-white p-5 shadow-sm transition-[border-color,box-shadow] hover:border-brand-cyan/40 hover:shadow-md">
      <div className="relative h-28 w-24 shrink-0 overflow-hidden rounded-[4px] border border-slate-200/80 bg-gradient-to-b from-slate-100 to-slate-200/90 sm:h-32 sm:w-28">
        {member.photoSrc ? (
          <Image
            src={member.photoSrc}
            alt={`${member.name}, ${member.title}`}
            fill
            className="object-cover object-top"
            sizes="112px"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-brand-slate/25">
            <UserRound className="h-10 w-10" strokeWidth={1} aria-hidden />
          </div>
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <p className="font-heading text-lg font-bold text-brand-blue">{member.name}</p>
        <p className="mt-1 text-sm text-brand-slate/70">{member.title}</p>
        {!member.photoSrc ? (
          <p className="mt-2 text-xs text-brand-slate/50">Portrait forthcoming</p>
        ) : null}
      </div>
    </article>
  );
}

export function LeadershipGrid({
  members,
  variant,
  className,
}: {
  members: readonly LeadershipMember[];
  variant: "board" | "management";
  className?: string;
}) {
  return (
    <div
      className={cn(
        variant === "board"
          ? "grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          : "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {members.map((member) => (
        <LeadershipProfileCard key={member.name} member={member} variant={variant} />
      ))}
    </div>
  );
}
