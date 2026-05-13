import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const siteDescription =
  "Energy for a Developing Nation. Unitech Hydropower Company Limited — clean, renewable run-of-river hydropower supporting national development in Nepal.";

export const metadata: Metadata = {
  title: {
    default: "Unitech Hydropower Company Limited",
    template: "%s · Unitech Hydropower",
  },
  description: siteDescription,
  openGraph: {
    type: "website",
    siteName: "Unitech Hydropower Company Limited",
    title: "Unitech Hydropower Company Limited",
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: "Unitech Hydropower Company Limited",
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${syne.variable} h-full scroll-smooth scroll-pt-16`}
    >
      <body className="flex min-h-screen flex-col bg-glacier font-sans text-brand-slate antialiased">
        <SiteHeader />
        {/* Offset for fixed header (h-16) so main content never stacks under the nav hit-area */}
        <div className="flex flex-1 flex-col pt-16">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
