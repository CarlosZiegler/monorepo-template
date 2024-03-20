"use client";
import Link from "next/link";

import { Button } from "@repo/ui/components/ui/button";
import { CardContent } from "@repo/ui/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { Input } from "@repo/ui/components/ui/input";

import { Icons } from "@repo/ui/components/ui/icons";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { api } from "../../../../lib/trpc/react";

export const signupSchema = z.object({
  email: z
    .string()
    .nonempty("This is required")
    .email({ message: "Must be a valid email" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters")
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).*$/,
      "Password must contain a number, uppercase and lowercase letters"
    ),
  language: z.string().optional(),
});

export const signInSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email or password"),
  password: z.string({ required_error: "Password is required" }),
});

type FormValues = z.infer<typeof signInSchema>;

export default function LoginForm() {
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { mutateAsync, isPending } = api.auth.signIn.useMutation();
  const { handleSubmit } = form;

  const handleOnSubmit = handleSubmit(async (data) => {
    const { email, password } = data;
    const res = await mutateAsync({
      email: email.toLowerCase(),
      password: password,
    });
    if (res?.data.user && !res?.error) {
      return router.push("/dashboard");
    }

    toast.error(res?.error?.message || "An error occurred");
  });

  return (
    <Form {...form}>
      <form onSubmit={handleOnSubmit}>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="m@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
                  <div className="flex justify-between align-middle">
                    <FormLabel>Password</FormLabel>
                    <p className="px-8 text-end text-sm text-muted-foreground">
                      <Link
                        href="/forgot"
                        className="hover:text-brand underline underline-offset-4"
                      >
                        Forgot ?
                      </Link>
                    </p>
                  </div>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className="w-full" color="primary" type="submit">
            Sign In
            {isPending && " ..."}
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              Or continue with
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="ghost" type="button">
              <Icons.google className="mr-2 h-4 w-4" />
              Google
            </Button>
            <Button
              variant="ghost"
              type="button"
              onClick={() => {
                // implement google auth
                console.log("clicked");
              }}
            >
              <Icons.gitHub className="mr-2 h-4 w-4" />
              Github
            </Button>
          </div>
        </CardContent>
      </form>
    </Form>
  );
}
