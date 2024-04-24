"use server";
import * as argon2 from "argon2";
import { cookies } from "next/headers";
import * as z from "zod";
import { getSession, lucia } from "../auth";
import db from "../db";
import { LoginSchema, RegisterSchema, SettingsSchema } from "../schemas";
import { getUserByEmail } from "./read";

export const verifyInvite = async (token: string) => {
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

    return { success: "E-posta doğrulandı.", email: existingToken.email };
  } catch {
    return { error: "Bir hata oluştu." };
  }
};

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Bir şeyler yanlış gitti. Lütfen tekrar deneyin." };
  }

  const { username, email, password } = validatedFields.data;

  const hashedPassword = await argon2.hash(password);

  try {
    await db.user.update({
      where: {
        email: email,
      },
      data: {
        username: username,
        password: hashedPassword,
      },
    });

    return { success: "Başarıyla kayıt oldunuz." };
  } catch {
    return { error: "Bir şeyler yanlış gitti. Lütfen tekrar deneyin." };
  }
};

export const logout = async () => {
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

export const login = async (values: z.infer<typeof LoginSchema>) => {
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

export const changeSettings = async (values: z.infer<typeof SettingsSchema>) => {
  const validatedFields = SettingsSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Bir şeyler yanlış gitti. Lütfen tekrar deneyin." };
  }

  const { username, email, password, newPassword } = validatedFields.data;

  const currentUser = await getSession();

  const existingUser = await getUserByEmail(currentUser.user?.email!);

  if (!existingUser) {
    return { error: "Kullanıcı bulunamadı." };
  }

  const isValidPassword = await argon2.verify(existingUser.password!, password);

  if (!isValidPassword) {
    return { error: "E-posta veya şifre değerlerinden biri yanlış." };
  }

  try {
    if (newPassword) {
      const hashedPassword = await argon2.hash(newPassword);

      await db.user.update({
        where: {
          id: currentUser.user?.id,
        },
        data: {
          username: username,
          email: email,
          password: hashedPassword,
        },
      });
    }

    await db.user.update({
      where: {
        id: currentUser.user?.id,
      },
      data: {
        username: username,
        email: email,
      },
    });

    return { success: "Ayarlarınız değiştirildi." };
  } catch {
    return { error: "Bir şeyler yanlış gitti. Lütfen tekrar deneyin." };
  }
};
