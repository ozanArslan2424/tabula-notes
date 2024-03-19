import * as z from "zod";

export const BookFormSchema = z.object({
  title: z.string().min(2, { message: "Kitap adı en az 2 karakterden oluşmalıdır." }),
  description: z.optional(z.string()),
  hasTasks: z.boolean(),
});

export const GroupFormSchema = z.object({
  title: z.string().min(2, { message: "Grup adı en az 2 karakterden oluşmalıdır." }),
});

export const LoginSchema = z.object({
  email: z.string().email({ message: "Geçerli bir e-posta adresi giriniz." }),
});

export const SettingsSchema = z.object({
  name: z.string().min(2, { message: "Kullanıcı adı en az 2 karakterden oluşmalıdır." }),
  image: z.optional(z.string().url()),
  newPassword: z.optional(z.string().min(8, { message: "Şifre en az 8 karakterden oluşmalıdır." })),
});

export const RegisterSchema = z.object({
  email: z.string().email({ message: "Geçerli bir e-posta adresi giriniz." }),
  name: z.string().min(2, { message: "Kullanıcı adı en az 2 karakterden oluşmalıdır." }),
  password: z.string().min(8, { message: "Şifre en az 8 karakterden oluşmalıdır." }),
});

export const CredentialsSchema = z.object({
  email: z.string().email({ message: "Geçerli bir e-posta adresi giriniz." }),
  password: z.string().min(8, { message: "Şifre en az 8 karakterden oluşmalıdır." }),
});
