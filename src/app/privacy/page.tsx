import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for Unitech Hydropower Company Ltd. — placeholder pending legal review.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto w-full max-w-[1440px] flex-1 px-8 pb-24 pt-24 md:px-20 md:pt-28">
      <h1 className="font-heading text-3xl font-bold text-brand-blue md:text-4xl">
        Privacy Policy
      </h1>
      <p className="mt-6 max-w-2xl text-base leading-relaxed text-brand-slate/90">
        This page is reserved for the company&apos;s privacy policy. Replace
        this copy with counsel-approved text before launch.
      </p>
      <p className="mt-8">
        <Link
          href="/"
          className="text-sm font-semibold text-brand-blue underline-offset-4 hover:underline"
        >
          Back to home
        </Link>
      </p>
    </main>
  );
}
