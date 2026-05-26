import type { Metadata } from "next";
import { ContactPageView } from "@/components/contact/contact-page-view";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Unitech Hydropower Company Limited — Kupondole, Lalitpur. Phone 01-4106123 · unitechhydropower@gmail.com",
};

export default function ContactPage() {
  return <ContactPageView />;
}
