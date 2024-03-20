"use client";

import { Sidebar } from "lucide-react";
import AuthProvider from "../../../components/auth-provider";
import Header from "../../../components/header";

export const dynamic = "force-dynamic";

export default function DashboardProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div>
        <Header />
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <main className="w-full pt-16">{children}</main>
        </div>
      </div>
    </AuthProvider>
  );
}
