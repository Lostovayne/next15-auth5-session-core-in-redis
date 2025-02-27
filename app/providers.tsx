"use client";

import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { signIn } from "next-auth/react";

export default function ({ provider, prefix }: { prefix: string; provider: { name: string; id: string } }) {
  return (
    <Button
      onClick={() => signIn(provider.id)}
      key={provider.name}
      variant="outline"
      className="flex w-full gap-x-3"
    >
      {provider.id === "google" && <Icon fontSize={18} icon="flat-color-icons:google" />}
      <span className="text-black">
        {prefix} with {provider.name}
      </span>
    </Button>
  );
}
