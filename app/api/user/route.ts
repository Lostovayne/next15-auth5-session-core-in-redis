export const runtime = "edge";

export const dynamic = "force-dynamic";

export const fetchCache = "force-no-store";

import { auth } from "@/app/lib/auth";
import redis from "@/app/lib/redis";
import { UserType } from "@/app/lib/types";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) return new NextResponse(null, { status: 400 });
    const body = await request.json();
    const userByEmail = await redis.get(`user:email:${session.user.email}`);
    const userData = await redis.get<UserType>(`user:${userByEmail}`);
    if (!userData) return new NextResponse(null, { status: 404 });
    if (body.name) userData.name = body.name;
    if (body.image) userData.image = body.image;
    await redis.set(`user:${userByEmail}`, userData);
    return new NextResponse();
  } catch (e: any) {
    const message = e.message || e.toString();
    console.log(message);
    return new NextResponse(message, { status: 500 });
  }
}
