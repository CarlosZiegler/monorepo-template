import { authRouter } from "./server/api/routers/auth";
import { profileRouter } from "./server/api/routers/profiles";
import {
  createTRPCRouter,
  inferRouterInputs,
  inferRouterOutputs,
} from "./server/api/trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  profiles: profileRouter,
});

export type AppRouter = typeof appRouter;
export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;
