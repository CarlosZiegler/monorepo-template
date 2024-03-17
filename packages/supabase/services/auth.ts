import {
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
} from "@supabase/supabase-js";
import { createServerClient } from "../server";

export type SupabaseServerClientType = {
  supabase?: ReturnType<typeof createServerClient>;
};

export type SignInWithPasswordCredentialsProps =
  SignInWithPasswordCredentials & {
    email: string;
    supabase?: ReturnType<typeof createServerClient>;
  };

export const signInWithPasswordCredentials = async ({
  email,
  password,
  supabase,
  options,
}: SignInWithPasswordCredentialsProps) => {
  const supabaseClient = supabase || createServerClient();
  return supabaseClient.auth.signInWithPassword({
    email,
    password,
    options,
  });
};

export type SignUpWithPasswordCredentialsProps =
  SignUpWithPasswordCredentials & {
    email: string;
    supabase?: ReturnType<typeof createServerClient>;
  };

export const signUpWithPasswordCredentials = async ({
  email,
  password,
  options,
  supabase,
}: SignUpWithPasswordCredentialsProps) => {
  const supabaseClient = supabase || createServerClient();
  return supabaseClient.auth.signUp({
    email,
    password,
    options,
  });
};

export const signOut = async (
  supabase?: SupabaseServerClientType["supabase"]
) => {
  const supabaseClient = supabase || createServerClient();
  return supabaseClient.auth.signOut();
};

export const getCurrentUser = async (
  supabase?: SupabaseServerClientType["supabase"]
) => {
  const supabaseClient = supabase || createServerClient();
  return supabaseClient.auth.getUser();
};
