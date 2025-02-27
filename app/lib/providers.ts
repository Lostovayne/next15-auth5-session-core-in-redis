import { nanoid } from "nanoid";
import Credentials from "next-auth/providers/credentials";
import { comparePassword, generateRandomString, hashPassword } from "./credentials";
import redis from "./redis";
import { UserType } from "./types";

export default [
  Credentials({
    credentials: {
      email: {},
      password: {},
    },
    authorize: async (credentials, request) => {
      let type;
      try {
        const tmp = new URL(request.url).searchParams.get("kind");
        if (tmp && typeof tmp === "string") type = tmp;
      } catch (e) {}
      if (
        !type ||
        !credentials.email ||
        typeof credentials.email !== "string" ||
        !credentials.password ||
        typeof credentials.password !== "string"
      )
        return null;
      const randomizedPassword = await generateRandomString(credentials.password);
      const userByEmail = await redis.get<string | null | undefined>(`user:email:${credentials.email}`);
      if (userByEmail) {
        if (type !== "in") {
          console.log(`can not sign in in a non sign-in mode.`);
          throw new Error(`can not sign in in a non sign-in mode.`);
        }
        const user = await redis.get<UserType>(`user:${userByEmail}`);
        if (!user) {
          console.log(
            `Found the user by email from user:email:${userByEmail}, but the user object is missing at user:${userByEmail}`
          );
          return null;
        }
        if (user.password) {
          const hashedPassword = await hashPassword(randomizedPassword);
          const isPasswordCorrect = await comparePassword(user.password, hashedPassword);
          if (isPasswordCorrect) {
            const { password, ...rest } = user;
            return rest;
          }
          throw new Error(`incorrect password for credentials.`);
        }
        throw new Error(`you are using some other authentication method already, but not credentials.`);
      } else {
        if (type !== "up") {
          console.log(`can not sign up in a non sign-up mode.`);
          throw new Error(`can not sign up in a non sign-up mode.`);
        }
        const newUser = {
          name: null,
          image: null,
          emailVerified: null,
          email: credentials.email,
          password: randomizedPassword,
        };
        const tmp = nanoid();
        await redis.set(`user:email:${credentials.email}`, tmp);
        await redis.set(`user:${tmp}`, newUser);
        return newUser;
      }
    },
  }),
];
