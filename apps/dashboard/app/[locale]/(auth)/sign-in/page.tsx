import Link from "next/link";

import { Card, CardFooter, CardHeader } from "@repo/ui/components/ui/card";

import LoginForm from "./login-form";

export default async function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <Card>
        <CardHeader className="justify-center space-y-2">
          <div className="m-2 flex flex-col space-y-3 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome back
            </h1>
          </div>
        </CardHeader>
        <LoginForm />
        <CardFooter className="mb-3 flex justify-center">
          <p className="px-8 text-center text-sm text-muted-foreground">
            <Link
              href="/sign-up"
              className="hover:text-brand underline underline-offset-4"
            >
              Don&apos;t have an account? Sign Up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
