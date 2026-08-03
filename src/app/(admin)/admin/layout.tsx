import type { Metadata } from "next";
import { Fraunces, Work_Sans } from "next/font/google";
import "@/app/globals.css";
import { Toaster } from "@/components/ui/sonner";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
});

const workSans = Work_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Admin | CommerceEveryDay",
    template: "%s | CommerceEveryDay Admin",
  },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${workSans.variable} h-full antialiased`}>
      <body className="min-h-full bg-background text-foreground">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
