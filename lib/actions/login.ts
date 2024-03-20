"use server";
import * as argon2 from "argon2";
import { cookies } from "next/headers";
import * as z from "zod";
import { lucia } from "../auth";
import db from "../db";
import { LoginSchema } from "../schemas";

export const Login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Bir şeyler yanlış gitti. Lütfen tekrar deneyin." };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await db.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!existingUser) {
    return { error: "Kullanıcı bulunamadı." };
  }

  if (!existingUser.password) {
    return { error: "Kullanıcı bulunamadı." };
  }

  const isValidPassword = await argon2.verify(existingUser.password, password);

  if (!isValidPassword) {
    return { error: "E-posta veya şifre değerlerinden biri yanlış." };
  }

  const session = await lucia.createSession(existingUser.id, {
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days from now
  });

  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

  return {
    success: "Başarıyla giriş yaptınız. Yönlendiriliyorsunuz...",
  };
};
