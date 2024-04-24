import * as z from "zod";

export const BookFormSchema = z.object({
  title: z.string().min(2, { message: "Kitap adı en az 2 karakterden oluşmalıdır." }),
  description: z.optional(z.string()),
  hasTasks: z.boolean(),
});

export const GroupFormSchema = z.object({
  title: z.string().min(2, { message: "Grup adı en az 2 karakterden oluşmalıdır." }),
});

export const RegisterSchema = z.object({
  email: z.string().email({ message: "Geçerli bir e-posta adresi giriniz." }),
  username: z.string().min(2, { message: "Kullanıcı adı en az 2 karakterden oluşmalıdır." }),
  password: z.string().min(8, { message: "Şifre en az 8 karakterden oluşmalıdır." }),
});

export const LoginSchema = z.object({
  email: z.string().email({ message: "Geçerli bir e-posta adresi giriniz." }),
  password: z.string().min(8, { message: "Şifre en az 8 karakterden oluşmalıdır." }),
});

export const VerifySchema = z.object({
  email: z.string().email({ message: "Geçerli bir e-posta adresi giriniz." }),
  code: z.string().length(6, { message: "Doğrulama kodu 6 karakterden oluşmalıdır." }),
});

export const QuicknoteSchema = z.object({
  content: z.string().min(1, { message: "Not içeriği boş olamaz." }),
});

export const BugSchema = z.object({
  subject: z.string().min(2, { message: "Konu en az 2 karakterden oluşmalıdır." }),
  description: z.string().min(10, { message: "Açıklama en az 10 karakterden oluşmalıdır." }),
});

export const SettingsSchema = z.object({
  email: z.string().email({ message: "Geçerli bir e-posta adresi giriniz." }),
  username: z.string().min(2, { message: "Kullanıcı adı en az 2 karakterden oluşmalıdır." }),
  password: z.string().min(8, { message: "Şifre en az 8 karakterden oluşmalıdır." }),
  newPassword: z.optional(z.string().min(8, { message: "Yeni şifre en az 8 karakterden oluşmalıdır." })),
});
