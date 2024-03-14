"use client";

import { api } from "@/lib/trpc/react";

export default function Profile() {
  const { data, isLoading } = api.profiles.getUsers.useQuery();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      {data?.users.data.users.map((user) => (
        <div key={user.id}>
          <h1>{user.email}</h1>
          <p>{user.id}</p>
        </div>
      ))}
    </div>
  );
}
