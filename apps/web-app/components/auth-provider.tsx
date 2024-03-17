import { createServerClient } from "@repo/supabase/server";
import { getCurrentUser } from "@repo/supabase/services/auth";
import { redirect } from "next/navigation";

export default async function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await getCurrentUser();

  if (!data.user) {
    return redirect("/login");
  }

  return children;
}
