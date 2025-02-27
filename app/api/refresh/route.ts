export const runtime = "edge";

export const dynamic = "force-dynamic";

export const fetchCache = "force-no-store";

import { auth } from "@/app/lib/auth";
import redis from "@/app/lib/redis";
import { UserType } from "@/app/lib/types";
import { encode } from "@auth/core/jwt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/**
 * Maneja la actualización y refresco de tokens de sesión para la autenticación.
 *
 * Esta función realiza las siguientes operaciones:
 * 1. Verifica si se debe usar una cookie segura basado en HTTPS
 * 2. Obtiene la sesión actual y acceso a las cookies
 * 3. Busca los datos del usuario en Redis usando el email
 * 4. Si no encuentra datos válidos, elimina la cookie de sesión
 * 5. Si encuentra datos, genera un nuevo token y actualiza la cookie
 *
 * @param {Request} request - Objeto Request de la petición HTTP entrante
 * @returns {Promise<NextResponse>} Respuesta HTTP indicando el resultado de la operación
 *
 * @throws {NextResponse} 500 - Si AUTH_SECRET no está configurado en variables de entorno
 * @throws {NextResponse} 400 - Si no hay sesión de usuario válida con email
 *
 * @example
 * // Ejemplo de uso en una petición GET
 * const response = await GET(request);
 * // response será NextResponse con estado 200 si todo es exitoso
 * // o con estados 400/500 si hay errores
 */
type RefreshResponse = Promise<NextResponse>;

export async function GET(request: Request): RefreshResponse {
  const useSecureCookie = request.url.startsWith("https:");
  const salt = useSecureCookie ? "__Secure-authjs.session-token" : "authjs.session-token";
  if (!process.env.AUTH_SECRET) return new NextResponse(null, { status: 500 });
  const [session, cookieStore] = await Promise.all([auth(), cookies()]);
  if (!session?.user?.email) return new NextResponse(null, { status: 400 });
  const userByEmail = await redis.get(`user:email:${session.user.email}`);
  const userData = await redis.get<UserType>(`user:${userByEmail}`);
  if (!userData?.email)
    cookieStore.set(salt, toString(), {
      secure: useSecureCookie,
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      maxAge: 0,
    });
  else {
    const { image, password, ...rest } = userData;
    const saltVal = await encode({
      salt,
      secret: process.env.AUTH_SECRET,
      token: { ...rest, picture: image },
    });
    cookieStore.set(salt, saltVal, { secure: useSecureCookie, path: "/", httpOnly: true, sameSite: "lax" });
  }
  return new NextResponse();
}
