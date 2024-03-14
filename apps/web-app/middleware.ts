import { updateSession } from "@repo/supabase/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { I18nMiddleware } from "@repo/internationalization/lib/locale-middleware";

export async function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-url", request.url);

  if (request.nextUrl.pathname.startsWith("/api")) {
    console.log("api requestHeaders", requestHeaders);
    const response = NextResponse.next({
      headers: requestHeaders,
    });
    return await updateSession(request, response);
  }
  const response = I18nMiddleware(request);
  response.headers.set("x-url", request.url);
  return await updateSession(request, response);
}

export const config = {
  matcher: ["/((?!static|.*\\..*|_next|favicon.ico|robots.txt).*)"],
};
