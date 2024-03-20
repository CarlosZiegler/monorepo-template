import "server-only";
import { createCallerFactory } from "@repo/trpc/server/api/trpc";
import { appRouter } from "@repo/trpc/root";
import { createServerClient } from "@repo/supabase/server";
import { headers } from "next/headers";
import { db } from "@repo/drizzle";

export const serverClient = createCallerFactory(appRouter)(async () => {
  const supabase = createServerClient();
  const headersList = headers();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return {
    user,
    db,
    headers: headersList,
    supabase,
  };
});
