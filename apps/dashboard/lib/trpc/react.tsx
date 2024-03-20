"use client";
import type { AppRouter } from "@repo/trpc/root";
import { createTRPCReact } from "@trpc/react-query";

export const api = createTRPCReact<AppRouter>();


export const TRPCReactProvider = api.Provider;
