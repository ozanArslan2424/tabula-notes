"use server";
import { auth } from "@/auth";
import db from "@/lib/db";
import { sendEmailChangeToken } from "@/lib/mail";
import { LoginSchema } from "@/lib/schemas";
import * as z from "zod";
import { generateEmailChangeToken } from "./create";

export const getCurrentUser = async () => {
  const session = await auth();

  return session?.user;
};

export const getUserRole = async () => {
  const session = await auth();

  return session?.user.role;
};

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  } catch {
    return null;
  }
};

export const getEmailChangeTokenByEmail = async (email: string) => {
  try {
    const emailChangeToken = await db.emailChangeToken.findFirst({
      where: {
        email,
      },
    });

    return emailChangeToken;
  } catch {
    return null;
  }
};

export const getEmailChangeTokenByToken = async (token: string) => {
  try {
    const emailChangeToken = await db.emailChangeToken.findUnique({
      where: {
        token,
      },
    });

    return emailChangeToken;
  } catch {
    return null;
  }
};

export const emailChangeAction = async (values: z.infer<typeof LoginSchema>) => {
  const user = await getCurrentUser();
  if (!user) {
    return { error: "Kullanıcı bulunamadı." };
  }
  if (user) {
    if (user.email === values.email) {
      return { error: "Bu e-posta zaten kullanılıyor." };
    }
    if (user.email !== values.email) {
      const emailChangeToken = await generateEmailChangeToken(values.email);
      await sendEmailChangeToken(emailChangeToken.email, emailChangeToken.token);
      return { success: "E-posta değişikliği için doğrulama e-postası gönderildi." };
    }
  }
};

export const newVerificationAction = async (token: string) => {
  const existingToken = await getEmailChangeTokenByToken(token);

  if (!existingToken) {
    return { error: "Bu doğrulama kodu geçersiz." };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Bu doğrulama kodunun süresi dolmuş." };
  }

  const dbUser = await getUserById(existingToken.userId!);
  if (!dbUser) {
    return { error: "Kullanıcı bulunamadı." };
  }

  await db.user.update({
    where: { id: dbUser.id },
    data: { emailVerified: new Date(), email: existingToken.email },
  });

  await db.emailChangeToken.delete({ where: { id: existingToken.id } });

  return { success: "E-posta başarıyla doğrulandı." };
};
