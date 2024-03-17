import { redirect } from "next/navigation";
import { getCurrentUser } from "@repo/supabase/services/auth";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    data: { user },
  } = await getCurrentUser();

  if (!user) {
    return redirect("/login");
  }
  return children;
}
