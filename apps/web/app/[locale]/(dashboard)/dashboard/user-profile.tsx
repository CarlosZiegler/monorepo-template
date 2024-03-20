"use client";

import { useRouter } from "next/navigation";
import { LoadingSpinner } from "@repo/ui/components/loading-spinner";

import { api } from "../../../../lib/trpc/react";

export default function Profile() {
  const router = useRouter();
  const { data, isLoading, error } = api.profiles.getUsers.useQuery();
  console.log({ data, error });
  if (error?.data?.httpStatus === 401) {
    console.log("redirecting to login");

    router.replace("/sign-in");
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex-1 flex flex-col gap-20 items-center">
      {data?.users.data.users.map((user) => (
        <div key={user.id}>
          <h1>{user.email}</h1>
          <p>{user.id}</p>
        </div>
      ))}
    </div>
  );
}
