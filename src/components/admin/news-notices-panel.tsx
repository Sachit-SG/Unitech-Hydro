"use client";

import { useState } from "react";
import { format } from "date-fns";
import { ImagePlus, Pencil, Plus, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export type NewsStatus = "Draft" | "Published";

export type NewsItem = {
  id: string;
  date: Date;
  headline: string;
  status: NewsStatus;
  content: string;
};

const MOCK_NEWS: NewsItem[] = [
  {
    id: "1",
    date: new Date("2026-05-11"),
    headline: "Upper Phawa Khola reaches commercial operation (COD)",
    status: "Published",
    content: "Commercial operation date recorded as BS 2081/01/08 per company disclosure.",
  },
  {
    id: "2",
    date: new Date("2026-04-20"),
    headline: "4th AGM presentation — FY 81/82",
    status: "Published",
    content: "Annual general meeting materials published for stakeholder review.",
  },
  {
    id: "3",
    date: new Date("2026-06-01"),
    headline: "Iwa Khola feasibility study progress",
    status: "Draft",
    content: "Draft notice for feasibility-stage updates. Pending final review.",
  },
];

type NewsFormState = {
  title: string;
  publishDate: Date | undefined;
  content: string;
};

const emptyForm = (): NewsFormState => ({
  title: "",
  publishDate: undefined,
  content: "",
});

type NewsNoticesPanelProps = {
  title?: string;
  createLabel?: string;
};

export function NewsNoticesPanel({
  title = "Manage News & Notices",
  createLabel = "Create Notice",
}: NewsNoticesPanelProps) {
  // TODO: Fetch news data from Supabase here
  const [newsItems, setNewsItems] = useState<NewsItem[]>(MOCK_NEWS);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<NewsFormState>(emptyForm);

  function openCreateDialog() {
    setEditingId(null);
    setForm(emptyForm());
    setDialogOpen(true);
  }

  function openEditDialog(item: NewsItem) {
    setEditingId(item.id);
    setForm({
      title: item.headline,
      publishDate: item.date,
      content: item.content,
    });
    setDialogOpen(true);
  }

  function handleDelete(id: string) {
    setNewsItems((prev) => prev.filter((item) => item.id !== id));
  }

  function upsertItem(status: NewsStatus) {
    if (!form.title.trim() || !form.publishDate) return;

    if (editingId) {
      setNewsItems((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                headline: form.title.trim(),
                date: form.publishDate!,
                content: form.content,
                status,
              }
            : item
        )
      );
    } else {
      setNewsItems((prev) => [
        {
          id: crypto.randomUUID(),
          headline: form.title.trim(),
          date: form.publishDate!,
          content: form.content,
          status,
        },
        ...prev,
      ]);
    }

    setDialogOpen(false);
    setForm(emptyForm());
    setEditingId(null);
  }

  return (
    <>
      <Card className="overflow-hidden">
        <CardContent className="space-y-6 p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-3">
              <Badge className="bg-[#00EAFF] text-[#0B2043] hover:bg-[#00EAFF]">
                Dynamic Content
              </Badge>
              <div>
                <h2 className="font-heading text-xl font-bold text-brand-blue">{title}</h2>
                <p className="mt-1 text-sm text-brand-slate/70">
                  Publish corporate updates, AGM notices, and project milestones.
                </p>
              </div>
            </div>
            <Button
              type="button"
              className="shrink-0 bg-[#00EAFF] text-[#0B2043] hover:bg-[#00EAFF]/90"
              onClick={openCreateDialog}
            >
              <Plus className="size-4" aria-hidden />
              {createLabel}
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Headline</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {newsItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="whitespace-nowrap text-brand-slate/80">
                    {format(item.date, "dd MMM yyyy")}
                  </TableCell>
                  <TableCell className="max-w-md font-medium">{item.headline}</TableCell>
                  <TableCell>
                    <Badge
                      variant={item.status === "Published" ? "default" : "secondary"}
                      className={cn(
                        item.status === "Published" &&
                          "border-transparent bg-[#0B2043] text-white"
                      )}
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => openEditDialog(item)}
                      >
                        <Pencil className="size-3.5" aria-hidden />
                        Edit
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:bg-red-50 hover:text-red-700"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 className="size-3.5" aria-hidden />
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Edit notice" : "Create notice"}
            </DialogTitle>
            <DialogDescription>
              {editingId
                ? "Update this entry. Changes sync to the public News page when published."
                : "Add a new corporate notice. Save as draft or publish immediately."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 py-2">
            <div className="space-y-2">
              <Label htmlFor="news-title">Title</Label>
              <Input
                id="news-title"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="Notice headline"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="news-publish-date">Publish date</Label>
              <DatePicker
                id="news-publish-date"
                date={form.publishDate}
                onDateChange={(date) => setForm((f) => ({ ...f, publishDate: date }))}
                placeholder="Select publish date"
              />
            </div>

            <div className="space-y-2">
              <Label>Thumbnail image</Label>
              {/* TODO: Connect to Supabase Storage */}
              <div
                className="flex min-h-[120px] flex-col items-center justify-center gap-2 rounded-[4px] border-2 border-dashed border-slate-300 bg-slate-50/80 p-6 text-center"
                role="button"
                tabIndex={0}
                aria-label="Upload thumbnail (coming soon)"
              >
                <ImagePlus className="size-8 text-[#00EAFF]" aria-hidden />
                <p className="text-sm font-medium text-brand-blue">
                  Drop image or click to upload
                </p>
                <p className="text-xs text-brand-slate/60">
                  Supabase Storage integration pending
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="news-content">Content</Label>
              {/* TODO: Replace with Rich Text Editor (e.g., TipTap) */}
              <Textarea
                id="news-content"
                value={form.content}
                onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                placeholder="Full notice body…"
                className="min-h-64"
              />
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => upsertItem("Draft")}
              disabled={!form.title.trim() || !form.publishDate}
            >
              Save as Draft
            </Button>
            <Button
              type="button"
              onClick={() => upsertItem("Published")}
              disabled={!form.title.trim() || !form.publishDate}
            >
              Publish
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
