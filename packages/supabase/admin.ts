import { env } from "@repo/env";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
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
export const supabaseAdminAuthClient = supabaseAdmin.auth.admin;
