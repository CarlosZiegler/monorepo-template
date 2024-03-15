import { createServerClient } from "@repo/supabase/server";
import {
  getCurrentLocale,
  getI18n,
} from "@repo/internationalization/lib/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LanguageSwitcher } from "./language-switcher";

export default async function AuthButton() {
  const t = await getI18n();
  const current = getCurrentLocale();
  console.log(current);
  const supabase = createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createServerClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.email}!{t("language.de")}
      <form action={signOut}>
        <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
          Logout {t("logout")}
        </button>
      </form>
      <LanguageSwitcher />
    </div>
  ) : (
    <Link
      href="/login"
      className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    >
      Login
    </Link>
  );
}
