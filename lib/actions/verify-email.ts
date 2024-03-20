"use server";
import { cookies } from "next/headers";
import { lucia } from "../auth";
import db from "../db";

export const VerifyEmail = async (token: string) => {
  const existingToken = await db.registerToken.findUnique({
    where: {
      token,
    },
  });

  if (!existingToken) {
    return { error: "Bu doğrulama kodu geçersiz." };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Bu doğrulama kodunun süresi dolmuş." };
  }

  const existingUser = await db.user.findUnique({
    where: {
      email: existingToken.email,
    },
  });

  if (!existingUser) {
    return { error: "E-posta geçersiz." };
  }

  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      emailVerified: true,
      email: existingToken.email,
    },
  });

  try {
    await db.registerToken.delete({
      where: {
        id: existingToken.id,
      },
    });

    const session = await lucia.createSession(existingUser.id, {
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days from now
    });

    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

    return { success: "E-posta doğrulandı." };
  } catch {
    return { error: "Bir hata oluştu." };
  }
};
