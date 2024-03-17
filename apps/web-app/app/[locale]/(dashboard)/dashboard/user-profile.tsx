"use client";

import { api } from "@/lib/trpc/react";

export default function Profile() {
  const { data } = api.profiles.getUsers.useQuery();

  return (
    <div
      className=" min-h-full
    flex-1 flex flex-col gap-20 items-center"
    >
      {data?.users.data.users.map((user) => (
        <div key={user.id}>
          <h1>{user.email}</h1>
          <p>{user.id}</p>
        </div>
      ))}
    </div>
  );
}
