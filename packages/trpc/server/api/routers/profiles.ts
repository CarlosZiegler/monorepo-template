import { db } from "@repo/drizzle";
import { createTRPCRouter, privateProcedure, publicProcedure } from "../trpc";
import { supabaseAdminAuthClient } from "@repo/supabase/admin";
import {
  getI18n,
  getCurrentLocale,
} from "@repo/internationalization/lib/server";

export const profileRouter = createTRPCRouter({
  getUsers: privateProcedure.query(async ({ ctx }) => {
    const t = await getI18n();
    const currentLanguage = getCurrentLocale();

    const usersFromDb = await db.query.users.findMany();

    const users = await supabaseAdminAuthClient.listUsers();
    return {
      data: "Testing Sentry Error...",
      status: 200,
      german: t("language.de"),
      currentLanguage,
      users,
      usersFromDb,
    };
  }),
  getCurrentUser: privateProcedure.query(async ({ ctx }) => {
    return {
      user: ctx.user,
    };
  }),
});
