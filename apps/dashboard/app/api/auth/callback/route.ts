import { createServerClient } from "@repo/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { COOKIES } from "../../../../constants/cookies.constants";
import { addYears } from "date-fns";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const cookieStore = cookies();
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the SSR package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/server-side/nextjs
  const requestUrl = new URL(request.url);
  // const client = requestUrl.searchParams.get("client");
  const returnTo = requestUrl.searchParams.get("return_to");
  const provider = requestUrl.searchParams.get("provider");
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;

  if (code) {
    const supabase = createServerClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  if (provider) {
    cookieStore.set(COOKIES.PreferredSignInProvider, provider, {
      expires: addYears(new Date(), 1),
    });
  }

  if (returnTo) {
    console.log("returnTo", returnTo);
    return NextResponse.redirect(`${requestUrl.origin}/${returnTo}`);
  }

  // URL to redirect to after sign up process completes
  return NextResponse.redirect(`${origin}/protected`);
}
