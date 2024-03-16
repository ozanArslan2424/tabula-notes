import { UserRole } from "@prisma/client";
import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Lütfen geçerli bir e-posta adresi giriniz.",
  }),
  password: z.string().min(1, {
    message: "Lütfen şifrenizi giriniz.",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  name: z.string().min(2, {
    message: "İsminiz en az 2 karakterden oluşmalıdır.",
  }),
  email: z.string().email({
    message: "Lütfen geçerli bir e-posta adresi giriniz.",
  }),
  password: z.string().min(8, {
    message: "Şifreniz en az 8 karakterden oluşmalıdır.",
  }),
});

export const PasswordResetSchema = z.object({
  email: z.string().email({
    message: "Lütfen geçerli bir e-posta adresi giriniz.",
  }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(8, {
    message: "Şifreniz en az 8 karakterden oluşmalıdır.",
  }),
});

export const SettingsSchema = z
  .object({
    name: z.optional(
      z
        .string()
        .min(2, {
          message: "İsminiz en az 2 karakterden oluşmalıdır.",
        })
        .max(50, {
          message: "İsminiz en fazla 50 karakter olabilir.",
        }),
    ),
    isTwoFactorEnabled: z.optional(z.boolean()),
    // SİLİNECEK V
    role: z.enum([UserRole.USER, UserRole.ADMIN]),
    // SİLİNECEK ^
    email: z.optional(z.string().email()),
    password: z.optional(
      z.string().min(8, { message: "Şifreniz en az 8 karakterden oluşmalıdır." }),
    ),
    newPassword: z.optional(
      z.string().min(8, { message: "Şifreniz en az 8 karakterden oluşmalıdır." }),
    ),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }
      return true;
    },
    {
      message: "Yeni şifre girmelisiniz.",
      path: ["newPassword"],
    },
  )
  .refine(
    (data) => {
      if (!data.password && data.newPassword) {
        return false;
      }
      return true;
    },
    {
      message: "Mevcut şifrenizi girmelisiniz.",
      path: ["password"],
    },
  );

export const BookFormSchema = z.object({
  title: z.string().min(2, { message: "Kitap en az 2 karakterden oluşmalıdır." }),
  description: z.optional(z.string()),
  hasTasks: z.boolean(),
});
