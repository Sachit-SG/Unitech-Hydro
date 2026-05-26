import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[200px] w-full rounded-[4px] border border-slate-200 bg-white px-3 py-3 text-sm leading-relaxed text-brand-slate shadow-sm placeholder:text-brand-slate/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/50 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
