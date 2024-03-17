import { redirect } from "next/navigation";
import { getCurrentUser } from "@repo/supabase/services/auth";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { cookies } from "next/headers";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    data: { user },
  } = await getCurrentUser();

  console.log("ProtectedLayout", user);
  if (!user) {
    return redirect("/login");
  }
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
