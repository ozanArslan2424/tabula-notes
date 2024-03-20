"use server";
import { cookies } from "next/headers";
import { getSession, lucia } from "../auth";

export const Logout = async () => {
  try {
    const { session } = await getSession();

    if (!session) {
      return { error: "Giriş yapılmamış." };
    }

    await lucia.invalidateSession(session.id);

    const sessionCookie = lucia.createBlankSessionCookie();

    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
  } catch (error) {
    return { error: "Bir şeyler yanlış gitti." };
  }
};
