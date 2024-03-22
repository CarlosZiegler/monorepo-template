"use client";

import { LoadingSpinner } from "@repo/ui/components/loading-spinner";

import { api } from "../../../../lib/trpc/react";

export default function Profile() {
  const { data, isLoading } = api.profiles.getCurrentUser.useQuery();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex-1 flex flex-col gap-20 items-center">
      {data ? (
        <div key={data.user.id}>
          <h1>{data.user.email}</h1>
          <p>{data.user.id}</p>
        </div>
      ) : (
        <p>No user found</p>
      )}
    </div>
  );
}
