import { createTRPCRouter, publicProcedure } from "../trpc";

import { z } from "zod";
import {
  signInWithPasswordCredentials,
  signOut,
  signUpWithPasswordCredentials,
} from "@repo/supabase/services/auth";

export const createUserSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email"),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters")
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).*$/,
      "Password must contain a number, uppercase and lowercase letters"
    ),
});

export const authRouter = createTRPCRouter({
  signUp: publicProcedure
    .input(createUserSchema)
    .mutation(async ({ input, ctx }) => {
      return signUpWithPasswordCredentials(input);
    }),
  signIn: publicProcedure
    .input(createUserSchema)
    .mutation(async ({ input, ctx }) => {
      return signInWithPasswordCredentials(input);
    }),
  signOut: publicProcedure.mutation(async ({ ctx }) => {
    return signOut();
  }),
});
