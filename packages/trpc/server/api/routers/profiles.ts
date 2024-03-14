import { eq, users } from "@repo/drizzle";
import { createTRPCRouter, privateProcedure, publicProcedure } from "../trpc";
import { supabaseAdminAuthClient } from "@repo/supabase/admin";

export const profileRouter = createTRPCRouter({
  getUsers: privateProcedure.query(async ({ ctx }) => {
    const users = await supabaseAdminAuthClient.listUsers();
    return {
      users,
    };
  }),
});
