"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Register } from "@/lib/actions/register";
import { RegisterSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../ui/button";
import { LoadingIcon2 } from "../ui/custom-loading";
import { Input } from "../ui/input";

export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof RegisterSchema>) => {
    startTransition(async () => {
      await Register(values);
    });
  };

  return (
    <Form {...form}>
      <h1 className="mb-2 text-center text-3xl font-bold">Hesap Oluştur</h1>
      <p className="mb-4 text-center text-muted-foreground">
        Şifreli hesap oluşturmak Google veya Github girişleri kadar güvenli değildir!
      </p>
      <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kullanıcı Adı</FormLabel>
              <FormControl>
                <Input {...field} id="name" type="text" required placeholder="username" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} id="email" type="email" required placeholder="mail@mail.com" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Şifre</FormLabel>
              <FormControl>
                <Input {...field} id="password" type="password" required placeholder="********" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="mt-2 w-full" type="submit" disabled={isPending}>
          {isPending ? <LoadingIcon2 /> : "Kaydol"}
        </Button>
      </form>
      <p className="mt-4 text-center text-muted-foreground">
        Hesabınız varsa{" "}
        <Link href="/login" className="underline hover:text-foreground">
          giriş yapın.
        </Link>
      </p>
    </Form>
  );
};
