import { getI18n } from "@repo/internationalization/lib/server";
import { redirect } from "next/navigation";
import { signOut } from "@repo/supabase/services/auth";

export default async function LogoutButton() {
  const t = await getI18n();

  const onSignOut = async () => {
    "use server";

    await signOut();
    return redirect("/sign-in");
  };

  return (
    <form action={onSignOut}>
      <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
        {t("logout")}
      </button>
    </form>
  );
}
