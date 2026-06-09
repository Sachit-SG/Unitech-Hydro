import { cn } from "@/lib/utils";
import { TeamPortraitMedia } from "@/components/team/team-portrait-media";

export type LeadershipMember = {
  name: string;
  title: string;
  /** Official portrait path under /public — omit until supplied */
  photoSrc?: string;
  /** When true and no photo, show neutral panel instead of stock placeholder */
  noStockPlaceholder?: boolean;
};

export function LeadershipProfileCard({ member }: { member: LeadershipMember }) {
  return (
    <article className="group overflow-hidden rounded-[4px] border border-slate-200/80 bg-white shadow-sm transition-[border-color,box-shadow] hover:border-brand-cyan/60 hover:shadow-[0_0_0_1px_rgba(0,210,255,0.35)]">
      <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
        <TeamPortraitMedia
          name={member.name}
          title={member.title}
          photoSrc={member.photoSrc}
          noStockPlaceholder={member.noStockPlaceholder}
        />
        {member.photoSrc ? (
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 to-transparent"
            aria-hidden
          />
        ) : null}
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
