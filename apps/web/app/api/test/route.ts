import {
  getCurrentLocale,
  getI18n,
} from "@repo/internationalization/lib/server";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// A faulty API route to test Sentry's error monitoring
export async function GET(request: Request) {
  const t = await getI18n();
  const currentLanguage = getCurrentLocale();

  return NextResponse.json({
    data: "Testing Sentry Error...",
    status: 200,
    german: t("language.de"),
    currentLanguage,
  });
}
