import { env } from "@repo/env";
import { AppRouter } from "@repo/trpc/root";
import { superjson } from "@repo/trpc/server/api/shared";

import { createTRPCClient, httpBatchLink, TRPCLink } from "@trpc/client";

function getBaseUrl() {
  if (typeof window !== "undefined") return "";
  if (env.VERCEL_URL) return `https://${env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export function getUrl() {
  return getBaseUrl() + "/api/trpc";
}

export const trpcLinks: TRPCLink<AppRouter>[] = [
  httpBatchLink({
    url: getUrl(),
    transformer: superjson,
  }),
];

export const nativeClient = createTRPCClient<AppRouter>({
  links: trpcLinks,
});
