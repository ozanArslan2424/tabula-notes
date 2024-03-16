"use server";
import {
  getCurrentUser,
  getPasswordResetTokenByToken,
  getTwoFactorConfirmationByUserId,
  getTwoFactorTokenByEmail,
  getUserByEmail,
  getUserById,
  getVerificationTokenByToken,
} from "@/actions/auth-read";
import { signIn, signOut } from "@/auth";
import { db } from "@/lib/db";
import { sendPasswordResetEmail, sendTwoFactorEmail, sendVerificationEmail } from "@/lib/mail";
import {
  LoginSchema,
  NewPasswordSchema,
  PasswordResetSchema,
  RegisterSchema,
  SettingsSchema,
} from "@/lib/schemas";
import {
  generatePasswordResetToken,
  generateTwoFactorToken,
  generateVerificationToken,
} from "@/lib/tokens";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import * as z from "zod";

export const loginAction = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null,
) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Bir şeyler yanlış gitti. Lütfen tekrar deneyin." };
  }

  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "E-posta bulunamadı." };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(existingUser.email);

    await sendVerificationEmail(verificationToken.email, verificationToken.token);

    return {
      actionRequired: "E-posta adresiniz doğrulanmamış. Yeni doğrulama kodu gönderildi.",
    };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      // check if code is valid
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

      if (!twoFactorToken) {
        return { error: "Geçersiz doğrulama kodu." };
      }

      if (twoFactorToken.token !== code) {
        return { error: "Geçersiz doğrulama kodu." };
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();

      if (hasExpired) {
        return { error: "Doğrulama kodu süresi doldu." };
      }

      await db.twoFactorToken.delete({
        where: { id: twoFactorToken.id },
      });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorEmail(twoFactorToken.email, twoFactorToken.token);
      return { twoFactor: true };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
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

export const passwordResetAction = async (values: z.infer<typeof PasswordResetSchema>) => {
  const validatedFields = PasswordResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Geçersiz e-posta." };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "E-posta bulunamadı." };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token);

  return { success: "E-posta gönderildi." };
};

export const logoutAction = async () => {
  // other server side logout logic if needed
  await signOut();
};

export const newPasswordAction = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null,
) => {
  if (!token) {
    return { error: "Token bulunamadı, doğru sayfada olduğunuzdan emin olun." };
  }

  const validatedFields = NewPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Geçersiz şifre." };
  }

  const { password } = validatedFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return { error: "Geçersiz token." };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Bağlantı süresi dolmuş." };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "Kullanıcı bulunamadı." };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  await db.passwordResetToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return { success: "Şifreniz güncellendi." };
};

export const newVerificationAction = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: "Bu doğrulama kodu geçersiz." };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Bu doğrulama kodunun süresi dolmuş." };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "E-posta geçersiz." };
  }

  await db.user.update({
    where: { id: existingUser.id },
    data: { emailVerified: new Date(), email: existingToken.email },
  });

  await db.verificationToken.delete({ where: { id: existingToken.id } });

  return { success: "E-posta başarıyla doğrulandı." };
};

export const registerAction = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Bir şeyler yanlış gitti. Lütfen tekrar deneyin." };
  }

  const { name, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Bu e-posta adresi zaten kullanılıyor." };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "Kayıt başarılı! Doğrulama e-postası gönderildi." };
};

export const updateSettings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await getCurrentUser();
  if (!user) {
    return { error: "Kullanıcı bulunamadı." };
  }

  const dbUser = await getUserById(user.id!);
  if (!dbUser) {
    return { error: "Kullanıcı bulunamadı." };
  }

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser && existingUser.id !== user.id) {
      return { error: "Bu e-posta adresi zaten kullanılıyor." };
    }

    const newMailVerificationToken = await generateVerificationToken(values.email);
    await sendVerificationEmail(newMailVerificationToken.email, newMailVerificationToken.token);
    return {
      success: "Yeni e-posta adresinizi doğrulamak için gönderilen linke tıklayınız.",
    };
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordsMatch = await bcrypt.compare(values.password, dbUser.password);

    if (!passwordsMatch) {
      return { error: "Yanlış şifre girdiniz." };
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);
    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  await db.user.update({
    where: {
      id: dbUser.id,
    },
    data: {
      ...values,
    },
  });
  return { success: "Ayarlar güncellendi." };
};

export const deleteAccount = async (userId: string) => {
  await db.user.delete({
    where: {
      id: userId,
    },
  });
};
