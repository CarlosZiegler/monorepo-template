import { NextResponse, type NextRequest } from "next/server";

import {
  createTRPCContext,
  fetchRequestHandler,
} from "@repo/trpc/server/api/trpc";
import { appRouter } from "@repo/trpc/root";
import { env } from "@repo/env";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a HTTP request (e.g. when you make requests from Client Components).
 */
const createContext = async (req: NextRequest) => {
  return createTRPCContext({
    headers: req.headers,
  });
};

const handler = async (req: NextRequest) => {
  try {
    cookies();
    const response = await fetchRequestHandler({
      endpoint: "/api/trpc",
      req,
      router: appRouter,
      createContext: () => createContext(req),
      onError: ({ path, error }: any) => {
        console.error(
          `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
        );
        console.error(error);
        if (error.message === "Unauthorized") {
          redirect("/login");
        }
      },
    });
    return new NextResponse(response.body, {
      headers: response.headers,
      status: response.status,
      statusText: response.statusText,
    });
  } catch (err) {
    console.error(err);
  }
};

export { handler as GET, handler as POST };
