"use server";
import { generateCodeVerifier, generateState } from "arctic";
import * as argon2 from "argon2";
import { generateId } from "lucia";
import { cookies } from "next/headers";
import * as z from "zod";
import { getSession, github, google, lucia } from "../auth";
import db from "../db";
import { LoginSchema, RegisterSchema } from "../schemas";

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

export const Register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Bir şeyler yanlış gitti. Lütfen tekrar deneyin." };
  }

  const { username, email, password } = validatedFields.data;

  const hashedPassword = await argon2.hash(password);
  const userId = generateId(15);
  const randomRegisterToken = generateId(15);
  const expires = new Date(new Date().getTime() + 3600 * 1000); // 1 hour

  const token = await db.registerToken.create({
    data: {
      email: email,
      expires: expires,
      token: randomRegisterToken,
    },
  });

  try {
    await db.user.create({
      data: {
        id: userId,
        email: email,
        username: username,
        password: hashedPassword,
        registerTokens: {
          connect: {
            id: token.id,
          },
        },
      },
    });
    return { token: token };
  } catch {
    return { error: "Bir şeyler yanlış gitti. Lütfen tekrar deneyin." };
  }
};

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

export const createGoogleAuthURL = async () => {
  try {
    const state = generateState();
    const codeVerifier = generateCodeVerifier();

    cookies().set("codeVerifier", codeVerifier, {
      httpOnly: true,
    });

    cookies().set("state", state, {
      httpOnly: true,
    });

    const authorizationURL = await google.createAuthorizationURL(state, codeVerifier, {
      scopes: ["email", "profile"],
    });

    return {
      success: true,
      data: authorizationURL.toString(),
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
};

export const createGithubAuthURL = async () => {
  try {
    const state = generateState();

    cookies().set("state", state, {
      httpOnly: true,
    });

    const authorizationURL = await github.createAuthorizationURL(state, {
      scopes: ["user:email"],
    });

    return {
      success: true,
      data: authorizationURL.toString(),
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
};
