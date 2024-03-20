"use server";
import * as argon2 from "argon2";
import { generateId } from "lucia";
import * as z from "zod";
import db from "../db";
import { RegisterSchema } from "../schemas";

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
