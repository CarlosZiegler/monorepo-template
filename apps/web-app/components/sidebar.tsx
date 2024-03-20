import { navItems } from "@/constants/data";
import { cn } from "@/lib/utils";
import { DashboardNav } from "./dashboard-nav";
import { useI18n } from "@repo/internationalization/lib/client";
export default function Sidebar() {
  const t = useI18n();
  return (
    <nav
      className={cn(`relative hidden h-screen border-r pt-16 lg:block w-72`)}
    >
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <h2 className="mb-2 px-4 text-xl font-semibold tracking-tight">
              Overview {t("language.de")}
            </h2>
            <DashboardNav items={navItems} />
          </div>
        </div>
      </div>
    </nav>
  );
}
