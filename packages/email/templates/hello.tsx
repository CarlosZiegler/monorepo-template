import { Button, Html } from "@react-email/components";
import {
  getCurrentLocale,
  getI18n,
} from "@repo/internationalization/lib/server";
import * as React from "react";

export default async function Hello() {
  const t = await getI18n();
  const currentLanguage = getCurrentLocale();
  console.log("currentLanguage", currentLanguage);

  return (
    <Html>
      <Button
        href="https://example.com"
        style={{ background: "#000", color: "#fff", padding: "12px 20px" }}
      >
        german: {t("language.de")},
      </Button>
    </Html>
  );
}
