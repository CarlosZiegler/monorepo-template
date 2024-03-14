import { env } from "@repo/env";
import { createBrowserClient } from "@supabase/ssr";

export const createClient = () =>
  createBrowserClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
