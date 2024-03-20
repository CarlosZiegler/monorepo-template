import { Providers } from "../../components/providers";
import "../globals.css";

import { Toaster } from "@repo/ui/components/ui/sonner";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <Providers locale={locale}>
      {children}
      <Toaster />
    </Providers>
  );
}

RootLayout.displayName = "RootLayout";
