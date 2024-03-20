"use client";

import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Provider as JotaiProvider } from "jotai";
import { I18nProviderClient } from "@repo/internationalization/lib/client";
import { useMemo, useState } from "react";

import { TooltipProvider } from "@repo/ui/components/ui/tooltip";

import { ThemeProvider } from "./theme-provider";
import { TRPCReactProvider, api } from "../lib/trpc/react";
import { trpcLinks } from "../lib/trpc/client";

type AppProviderProps = {
  children: React.ReactNode;
  locale: string;
};

export function Providers({ children, locale }: AppProviderProps) {
  const queryClient = useMemo(() => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry: false,
        },
      },
      queryCache: new QueryCache({
        onError: (error) => {
          console.log(error.message);
          console.log("Printing error", error);
        },
      }),
      mutationCache: new MutationCache({
        onError: (error: any) => {
          console.log(error.message);
          console.log("Printing mutation error", error);
        },
      }),
    });
  }, []);

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
