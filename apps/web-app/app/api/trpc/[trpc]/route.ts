import { NextResponse, type NextRequest } from "next/server";

import {
  createTRPCContext,
  fetchRequestHandler,
} from "@repo/trpc/server/api/trpc";
import { appRouter } from "@repo/trpc/root";
import { env } from "@repo/env";
import { cookies } from "next/headers";

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
      allowBatching: true,
      req,
      router: appRouter,
      createContext: () => {
        return createContext(req);
      },
      // onError: ({ path, error }) => {
      //   console.error(
      //     `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
      //   );
      //   console.error("----------------------------", error.code);
      //   // if (["UNAUTHORIZED"].includes(error.code)) {
      //   //   console.log("Redirecting to /sign-in", new URL("/sign-in", req.url));
      //   //   return NextResponse.redirect(new URL("/sign-in", req.url));
      //   // }

      //   console.log("---------------> Redirecting to NEXT");
      //   return NextResponse.next();
      // },
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
