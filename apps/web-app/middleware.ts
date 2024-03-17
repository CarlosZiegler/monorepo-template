import { updateSession } from "@repo/supabase/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { I18nMiddleware } from "@repo/internationalization/lib/locale-middleware";

export async function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-url", request.url);

  console.log("middleware", request.url);

  if (request.nextUrl.pathname.startsWith("/api")) {
    const nextResponse = NextResponse.next({
      headers: requestHeaders,
    });
    const { error, response } = await updateSession(request, nextResponse);

    if (request.nextUrl.pathname.startsWith("/api/trpc")) {
      // The TRPC has your own validation and context
      return response;
    }

    if (error) {
      return NextResponse.json(
        {
          error: error.message,
          status: error.status || 500,
        },
        {
          status: error.status || 500,
          statusText: error.message,
          headers: requestHeaders,
        }
      );
    }

    return response;
  }
  const nextResponse = I18nMiddleware(request);
  nextResponse.headers.set("x-url", request.url);
  const { response } = await updateSession(request, nextResponse);
  return response;
}

export const config = {
  matcher: ["/((?!static|.*\\..*|_next|favicon.ico|robots.txt).*)"],
};
