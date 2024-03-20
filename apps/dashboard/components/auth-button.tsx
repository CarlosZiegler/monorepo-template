import { getI18n } from "@repo/internationalization/lib/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LanguageSwitcher } from "./language-switcher";
import { getCurrentUser, signOut } from "@repo/supabase/services/auth";

export default async function AuthButton() {
  const t = await getI18n();

  const user = await getCurrentUser();

  const onSignOut = async () => {
    "use server";

    await signOut();
    return redirect("/sign-in");
  };

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.email}!{t("language.de")}
      <form action={onSignOut}>
        <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
          Logout {t("logout")}
        </button>
      </form>
      <LanguageSwitcher />
    </div>
  ) : (
    <Link
      href="/sign-in"
      className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    >
      Login
    </Link>
  );
}
