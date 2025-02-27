export const runtime = "edge";

import { CSRFInput } from "@/app/csrf";
import Provider from "@/app/providers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth } from "@/app/lib/auth";
import providers from "@/app/lib/providers";
import { unstable_noStore } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function () {
  unstable_noStore();
  const session = await auth();
  if (session) redirect("/");
  return (
    <div className="border md:border-white/10 flex items-center justify-center py-12">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Sign Up</h1>
          <p className="text-balance text-muted-foreground">
            Enter your email below to sign up with an account
          </p>
        </div>
        {providers
          .filter(
            (provider) => (typeof provider === "function" ? provider({}).id : provider.id) !== "credentials"
          )
          .map((provider) => (
            <Provider
              prefix="Sign up"
              key={typeof provider === "function" ? provider({}).name : provider.name}
              provider={typeof provider === "function" ? provider({}) : provider}
            />
          ))}
        <p className="text-gray-300 text-xs text-center">OR</p>
        <form method="POST" className="grid gap-4" action="/api/auth/callback/credentials?kind=up">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input name="email" id="email" type="email" placeholder="m@example.com" required />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input name="password" id="password" type="password" required />
            <CSRFInput />
          </div>
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signin" className="underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
