import "server-only";

import { createServerClient } from "@repo/supabase/server";
import { initTRPC, TRPCError } from "@trpc/server";
import { ZodError } from "zod";
import { db } from "@repo/drizzle";

import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { observable } from "@trpc/server/observable";
import { type TRPCErrorResponse } from "@trpc/server/rpc";
import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";
import { superjson } from "./shared";

export const createTRPCContext = async (opts: { headers: Headers }) => {
  const supabase = createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return {
    user,
    db,
    supabase,
    ...opts,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,

  errorFormatter({ shape, error }) {
    console.log(error);
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const {
  router: createTRPCRouter,
  procedure: publicProcedure,
  createCallerFactory,
  middleware,
  mergeRouters,
} = t;

const enforceUserIsAuthed = t.middleware(async ({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });
  }

  return next({
    ctx: {
      user: ctx.user,
      db: ctx.db,
    },
  });
});

export const privateProcedure = t.procedure.use(enforceUserIsAuthed);

export {
  fetchRequestHandler,
  observable,
  TRPCErrorResponse,
  inferRouterInputs,
  inferRouterOutputs,
};
