"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type DatePickerProps = {
  date?: Date;
  onDateChange: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
  id?: string;
};

export function DatePicker({
  date,
  onDateChange,
  placeholder = "Pick a date",
  className,
  id,
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant="outline"
          type="button"
          className={cn(
            "h-10 w-full justify-start rounded-[4px] border-slate-200 bg-white px-3 text-left font-normal text-brand-slate hover:bg-slate-50",
            !date && "text-brand-slate/40",
            className
          )}
        >
          <CalendarIcon className="mr-2 size-4 text-brand-cyan" aria-hidden />
          {date ? format(date, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={date} onSelect={onDateChange} />
      </PopoverContent>
    </Popover>
  );
}
