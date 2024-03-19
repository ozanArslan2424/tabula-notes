"use server";
import bcrypt from "bcryptjs";
import * as z from "zod";
import db from "../db";
import { sendRegisterToken } from "../mail";
import { RegisterSchema } from "../schemas";
import { generateRegisterToken } from "./create";
import { getUserByEmail } from "./user";

export const Register = async (values: z.infer<typeof RegisterSchema>) => {
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

  try {
    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const registerVerificationToken = await generateRegisterToken(email);
    await sendRegisterToken(registerVerificationToken.email, registerVerificationToken.token);

    return { success: "Kayıt başarılı! Doğrulama e-postası gönderildi." };
  } catch {
    return { error: "Bir şeyler yanlış gitti. Lütfen tekrar deneyin." };
  }
};
