import {
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
} from "@supabase/supabase-js";
import { createServerClient } from "../server";

export type SignInWithPasswordCredentialsProps =
  SignInWithPasswordCredentials & {
    email: string;
  };

export const signInWithPasswordCredentials = async ({
  email,
  password,

  options,
}: SignInWithPasswordCredentialsProps) => {
  const supabaseClient = createServerClient();
  return supabaseClient.auth.signInWithPassword({
    email,
    password,
    options,
  });
};

export type SignUpWithPasswordCredentialsProps =
  SignUpWithPasswordCredentials & {
    email: string;
  };

export const signUpWithPasswordCredentials = async ({
  email,
  password,
  options,
}: SignUpWithPasswordCredentialsProps) => {
  const supabaseClient = createServerClient();
  return supabaseClient.auth.signUp({
    email,
    password,
    options,
  });
};

export const signOut = async () => {
  const supabaseClient = createServerClient();
  return supabaseClient.auth.signOut();
};

export const getCurrentUser = async () => {
  const supabaseClient = createServerClient();
  const { data, error } = await supabaseClient.auth.getUser();
  if (error) {
    throw error;
  }
  return data.user;
};
