"use client";
import { createClient } from "@repo/supabase/client";
import { Button } from "@repo/ui/components/ui/button";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export function GoogleSignIn() {
  const [isLoading, setLoading] = useState(false);
  const supabase = createClient();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("return_to");

  const handleSignIn = async () => {
    setLoading(true);
    const redirectTo = new URL("/api/auth/callback", window.location.origin);

    if (returnTo) {
      redirectTo.searchParams.append("return_to", returnTo);
    }

    redirectTo.searchParams.append("provider", "google");

    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: redirectTo.toString(),
      },
    });
  };

  return (
    <Button
      onClick={handleSignIn}
      variant={"outline"}
      className="w-full"
      type="button"
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <span>Login with Google</span>
      )}
    </Button>
  );
}
