import { NextResponse, type NextRequest } from "next/server";

import {
  createTRPCContext,
  fetchRequestHandler,
} from "@repo/trpc/server/api/trpc";
import { appRouter } from "@repo/trpc/root";

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
  console.log("handler", req.url);
  try {
    const response = await fetchRequestHandler({
      endpoint: "/api/trpc",
      req,
      router: appRouter,
      createContext: () => createContext(req),
      onError: ({ error, path }) => {
        console.error(
          `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
        );

        if (error.code === "INTERNAL_SERVER_ERROR") {
          // TODO: send to bug reporting
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
