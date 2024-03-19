"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useChangeLocale,
  useCurrentLocale,
  useI18n,
} from "@repo/internationalization/lib/client";

const languageValues = ["en", "de"] as const;

export const LanguageSwitcher = () => {
  const currentLocale = useCurrentLocale();
  const changeLocale = useChangeLocale();
  const t = useI18n();
  return (
    <div>
      <Select
        onValueChange={(value: (typeof languageValues)[number]) =>
          changeLocale(value)
        }
        defaultValue={currentLocale}
      >
        <SelectTrigger className="container w-[120px]">
          <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={languageValues[0]}>{t("language.en")}</SelectItem>
          <SelectItem value={languageValues[1]}>{t("language.de")}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

LanguageSwitcher.displayName = "LanguageSwitcher";
