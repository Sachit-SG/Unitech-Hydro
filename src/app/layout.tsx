import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import { SiteChrome } from "@/components/site-chrome";
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
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
