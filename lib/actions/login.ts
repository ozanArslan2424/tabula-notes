"use server";
import { signIn } from "@/auth";
import { CredentialsSchema, LoginSchema } from "@/lib/schemas";
import { AuthError } from "next-auth";
import * as z from "zod";
import { sendRegisterToken } from "../mail";
import { generateRegisterToken } from "./create";
import { getUserByEmail } from "./user";

export async function Login(values: z.infer<typeof LoginSchema>) {
  await signIn("nodemailer", { email: values.email });
}

export async function OAuthLogin(provider: string) {
  await signIn(provider).then((res) => {
    console.log(res);
  });
}

export const CredentialsLogin = async (
  values: z.infer<typeof CredentialsSchema>,
  callbackUrl?: string | null,
) => {
  const validatedFields = CredentialsSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Bir şeyler yanlış gitti. Lütfen tekrar deneyin." };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "E-posta bulunamadı." };
  }

  if (!existingUser.emailVerified) {
    const registerVerificationToken = await generateRegisterToken(existingUser.email);

    await sendRegisterToken(registerVerificationToken.email, registerVerificationToken.token);

    return {
      actionRequired: "E-posta adresiniz doğrulanmamış. Yeni doğrulama kodu gönderildi.",
    };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || "/dash",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Geçersiz e-posta veya şifre." };
        default:
          return { error: "Bir şeyler yanlış gitti." };
      }
    }

    throw error;
  }
};
