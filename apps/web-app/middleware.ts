import { updateSession } from "@repo/supabase/middleware";

import { NextRequest, NextResponse } from "next/server";
import { I18nMiddleware } from "@repo/internationalization/lib/locale-middleware";

const allowedRoutes = [
  "/sign-",
  "/de/sign-",
  "/en/sign-",
  "/api/trpc",
  "/en/api/trpc",
  "/de/api/trpc",
];

const exactRoutes = ["/", "/de", "/en"];

export async function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-url", request.url);

  const nextResponse = I18nMiddleware(request);
  nextResponse.headers.set("x-url", request.url);

  const { error, response } = await updateSession(request, nextResponse);

  console.log("patch name", request.nextUrl.pathname);
  if (error?.status === 401) {
    if (
      allowedRoutes.some((route) =>
        request.nextUrl.pathname.startsWith(route)
      ) ||
      exactRoutes.some((route) => request.nextUrl.pathname === route)
    ) {
      return nextResponse;
    }
    let callback = request.nextUrl.pathname;
    if (request.nextUrl.search) {
      callback += request.nextUrl.search;
    }
    return NextResponse.redirect(
      new URL(
        `/sign-in?callbackUrl=${encodeURIComponent(callback)}`,
        request.url
      )
    );
  }

  return response;
}

export const config = {
  matcher: ["/((?!static|.*\\..*|_next|favicon.ico|robots.txt).*)"],
};
