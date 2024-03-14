"use client";

import { createI18nClient } from "next-international/client";

export const {
  useI18n,
  useScopedI18n,
  I18nProviderClient,
  useChangeLocale,
  useCurrentLocale,
  I18nClientContext,
  defineLocale,
} = createI18nClient({
  en: () => import("./en"),
  de: () => import("./de"),
});
