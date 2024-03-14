import { profileRouter } from "./server/api/routers/profiles";
import {
  createTRPCRouter,
  inferRouterInputs,
  inferRouterOutputs,
} from "./server/api/trpc";

export const appRouter = createTRPCRouter({
  profiles: profileRouter,
});

export type AppRouter = typeof appRouter;
export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;
