import Profile from "./user-profile";

export default async function ProtectedPage() {
  return (
    <main className="flex-1 h-full w-full flex flex-col gap-20 items-center">
      <Profile />
    </main>
  );
}
