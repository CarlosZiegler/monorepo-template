import { env } from "@repo/env";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

// Access auth admin api
export const supabaseAdminAuthClient = supabase.auth.admin;
