"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

export const CAPITAL_AMOUNT_PATTERN = /^\d+(\.\d{1,2})?\s*(cr|crore|crores)\.?$/i;

type BoardMember = {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
};

const INITIAL_CHAIRMAN_MESSAGE = `It gives me great pleasure to welcome you to Unitech Hydropower Company Limited.

Since our establishment, we have remained committed to contributing to Nepal's growing energy needs through the sustainable development of hydropower resources. Our transition from a Private Limited Company to a Public Limited Company reflects our dedication to growth, transparency, and broader stakeholder participation.`;

const INITIAL_BOARD: BoardMember[] = [
  { id: "1", name: "Anoj Khadka", role: "Chairman", imageUrl: "/dam2.jpg" },
  { id: "2", name: "Dinesh Lal Shrestha", role: "Director", imageUrl: "/dam2.jpg" },
  { id: "3", name: "Anand Kumar Basnet", role: "Director", imageUrl: "/dam2.jpg" },
  { id: "4", name: "Shobha Basnet", role: "Director", imageUrl: "/dam2.jpg" },
  { id: "5", name: "Vishwa Prakash Amatya", role: "Director", imageUrl: "/dam2.jpg" },
  { id: "6", name: "Pramod Kumar Shah", role: "Independent Director", imageUrl: "/dam2.jpg" },
];

const CAPITAL_FIELDS = [
  { key: "authorized", label: "Authorized Capital", placeholder: "120.00 cr" },
  { key: "issued", label: "Issued Capital", placeholder: "98.50 cr" },
  { key: "paidUp", label: "Paid-up Capital", placeholder: "78.80 cr" },
  { key: "ipo", label: "IPO (planned size)", placeholder: "19.70 cr" },
] as const;

type CapitalKey = (typeof CAPITAL_FIELDS)[number]["key"];

function validateCapitalValue(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "Required";
  if (!CAPITAL_AMOUNT_PATTERN.test(trimmed)) {
    return "Use format like 120.00 cr";
  }
  return null;
}

type AboutUsTabContentProps = {
  onSave?: (section: string) => void;
};

export function AboutUsTabContent({ onSave }: AboutUsTabContentProps) {
  const [chairmanMessage, setChairmanMessage] = useState(INITIAL_CHAIRMAN_MESSAGE);
  const [boardMembers, setBoardMembers] = useState<BoardMember[]>(INITIAL_BOARD);
  const [capital, setCapital] = useState<Record<CapitalKey, string>>({
    authorized: "120.00 cr",
    issued: "98.50 cr",
    paidUp: "78.80 cr",
    ipo: "19.70 cr",
  });
  const [capitalErrors, setCapitalErrors] = useState<Partial<Record<CapitalKey, string>>>(
    {}
  );

  const capitalValid = useMemo(
    () =>
      CAPITAL_FIELDS.every(
        (field) => validateCapitalValue(capital[field.key]) === null
      ),
    [capital]
  );

  function handleCapitalChange(key: CapitalKey, value: string) {
    setCapital((prev) => ({ ...prev, [key]: value }));
    const error = validateCapitalValue(value);
    setCapitalErrors((prev) => ({
      ...prev,
      [key]: error ?? undefined,
    }));
  }

  function save(section: string) {
    if (section === "Capital Structure" && !capitalValid) return;
    onSave?.(section);
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="space-y-3">
          <Badge variant="secondary">Static Layout</Badge>
          <CardTitle>Chairman&apos;s message</CardTitle>
          <CardDescription>
            Layout and image placement are locked. Only the message text can be updated.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Label htmlFor="chairman-message">Message content</Label>
          <Textarea
            id="chairman-message"
            value={chairmanMessage}
            onChange={(e) => setChairmanMessage(e.target.value)}
            className="min-h-[240px]"
          />
        </CardContent>
        <CardFooter className="justify-end gap-3">
          <Button variant="secondary" type="button">
            Discard
          </Button>
          <Button type="button" onClick={() => save("Chairman's Message")}>
            Save message
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader className="flex flex-row flex-wrap items-start justify-between gap-4 space-y-0">
          <div className="space-y-3">
            <Badge className="bg-[#00EAFF] text-[#0B2043] hover:bg-[#00EAFF]">
              Dynamic List
            </Badge>
            <div>
              <CardTitle>Board of Directors</CardTitle>
              <CardDescription>
                Add, edit, or remove board members for the public About page.
              </CardDescription>
            </div>
          </div>
          <Button
            type="button"
            className="shrink-0 bg-[#00EAFF] text-[#0B2043] hover:bg-[#00EAFF]/90"
            onClick={() =>
              setBoardMembers((prev) => [
                ...prev,
                {
                  id: crypto.randomUUID(),
                  name: "New board member",
                  role: "Director",
                  imageUrl: "/dam2.jpg",
                },
              ])
            }
          >
            <Plus className="size-4" aria-hidden />
            Add Board Member
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Image Preview</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {boardMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell>
                    <div className="relative size-12 overflow-hidden rounded-[4px] border border-slate-200">
                      <Image
                        src={member.imageUrl}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button type="button" variant="outline" size="sm">
                        <Pencil className="size-3.5" aria-hidden />
                        Edit
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:bg-red-50 hover:text-red-700"
                        onClick={() =>
                          setBoardMembers((prev) => prev.filter((m) => m.id !== member.id))
                        }
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
        <CardFooter className="justify-end">
          <Button type="button" onClick={() => save("Board of Directors")}>
            Save board list
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader className="space-y-3">
          <Badge variant="outline">Financial Data</Badge>
          <CardTitle>Capital structure</CardTitle>
          <CardDescription>
            Crore format only (e.g. <span className="font-mono">120.00 cr</span>).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {CAPITAL_FIELDS.map((field) => {
              const error = capitalErrors[field.key];
              return (
                <div key={field.key} className="space-y-2">
                  <Label htmlFor={field.key}>{field.label}</Label>
                  <Input
                    id={field.key}
                    value={capital[field.key]}
                    onChange={(e) => handleCapitalChange(field.key, e.target.value)}
                    placeholder={field.placeholder}
                    inputMode="decimal"
                    aria-invalid={Boolean(error)}
                    className={cn(error && "border-red-400 focus-visible:ring-red-300")}
                  />
                  {error ? (
                    <p className="text-xs text-red-600" role="alert">
                      {error}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </CardContent>
        <CardFooter className="justify-end gap-3 border-t border-slate-100">
          <Button variant="secondary" type="button">
            Reset
          </Button>
          <Button
            type="button"
            disabled={!capitalValid}
            onClick={() => save("Capital Structure")}
          >
            Save capital data
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
