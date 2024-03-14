"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as JotaiProvider } from "jotai";
import { I18nProviderClient } from "@repo/internationalization/lib/client";
import { useState } from "react";

import { TooltipProvider } from "@/components/ui/tooltip";
import { trpcLinks } from "@/lib/trpc/client";
import { api, TRPCReactProvider } from "@/lib/trpc/react";
import { ThemeProvider } from "./theme-provider";

type AppProviderProps = {
	children: React.ReactNode;
	locale: string;
};

export function Providers({ children , locale }: AppProviderProps) {
  const [queryClient] = useState(() => {
    return new QueryClient();
  });

  const [trpcClient] = useState(() => {
    return api.createClient({
      links: trpcLinks,
    });
  });

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <I18nProviderClient locale={locale}>

      <TRPCReactProvider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <JotaiProvider>
            <TooltipProvider>{children}</TooltipProvider>
          </JotaiProvider>
        </QueryClientProvider>
      </TRPCReactProvider>
      </I18nProviderClient>
    </ThemeProvider>
  );
}
