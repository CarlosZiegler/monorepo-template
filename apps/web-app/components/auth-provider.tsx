"use client";
import { api } from "@/lib/trpc/react";
import { useQueryClient } from "@tanstack/react-query";

import { useRouter } from "next/navigation";
import { LoadingSpinner } from "./loading-spinner";
import { useEffect } from "react";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { error, isLoading } = api.profiles.getCurrentUser.useQuery();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (error?.data?.httpStatus === 401) {
      router.replace("/sign-in");
    }
    return () => {
      queryClient.clear();
    };
  }, [error, queryClient, router]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return children;
}
