import { UpstashRedisAdapter } from "@auth/upstash-redis-adapter";
import NextAuth from "next-auth";
import providers from "./providers";
import redis from "./redis";

export const { handlers, signIn, signOut, auth } = NextAuth(() => ({
  providers,
  session: { strategy: "jwt" },
  adapter: UpstashRedisAdapter(redis),
}));
