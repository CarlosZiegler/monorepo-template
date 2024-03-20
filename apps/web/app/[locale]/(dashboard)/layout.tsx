"use client";

import AuthProvider from "../../../components/auth-provider";
import Header from "../../../components/header";
import Sidebar from "../../../components/sidebar";

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
