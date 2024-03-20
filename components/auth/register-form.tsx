"use client";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { sendToken } from "@/lib/actions/mail";
import { Register } from "@/lib/actions/register";
import { RegisterSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof RegisterSchema>) => {
    startTransition(async () => {
      await Register(values).then((data) => {
        if (data.error) {
          toast.error(data.error);
        }
        if (data.token) {
          setSuccess(true);
          sendToken(data.token.token, data.token.email);
          toast.success("Kayıt başarılı. E-posta adresinizi kontrol edin.");
        }
      });
    });
  };

  return (
    <>
      {success && (
        <div className="mb-4 w-full rounded-md bg-emerald-500 p-4 text-center">
          <p className="text-white">Kayıt başarılı. E-posta adresinizi kontrol edin.</p>
          <p className="text-sm text-white">Bu sayfada daha fazla değişiklik yapamazsınız</p>
        </div>
      )}
      <h1 className="mb-4 text-center text-3xl font-bold">Hesap Oluştur</h1>
      <Form {...form}>
        <form className="min-w-96 space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-posta Adresi</FormLabel>
                <FormControl>
                  <Input disabled={success} {...field} id="email" type="email" required placeholder="mail@mail.com" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kullanıcı Adı</FormLabel>
                <FormControl>
                  <Input disabled={success} {...field} id="username" type="text" required placeholder="username" />
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
                  <Input disabled={success} {...field} id="password" type="password" required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit" disabled={isPending || success}>
            {isPending ? "Kaydolunuyor..." : "Kaydol"}
          </Button>
          <p className="mt-4 text-center text-muted-foreground">
            Hesabınız varsa{" "}
            <Link href="/login" className="underline hover:text-foreground">
              giriş yapın.
            </Link>
          </p>
        </form>
      </Form>
    </>
  );
};
