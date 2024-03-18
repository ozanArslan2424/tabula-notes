"use server";
import { signIn } from "@/auth";
import { LoginSchema } from "@/lib/schemas";
import * as z from "zod";

export async function Login(values: z.infer<typeof LoginSchema>) {
  await signIn("nodemailer", { email: values.email });
}

export async function OAuthLogin(provider: string) {
  await signIn(provider).then((res) => {
    console.log(res);
  });
}
