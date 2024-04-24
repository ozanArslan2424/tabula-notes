"use client";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { register } from "@/lib/actions/auth.actions";
import { RegisterSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export const RegisterForm = ({ email }: { email: string }) => {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: email,
      username: "",
      password: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof RegisterSchema>) => {
    startTransition(async () => {
      await register(values).then((data) => {
        if (data.error) {
          toast.error(data.error);
        }
        if (data.success) {
          setSuccess(true);
          router.push("/dash");
        }
      });
    });
  };

  return (
    <div className="max-w-96 text-left">
      <h1 className="text-3xl font-bold">Hesap Oluştur</h1>
      <p className="mb-4 text-muted-foreground">Hesabınızı oluşturmak için kullanıcı adı ve şifre belirleyin.</p>
      <Form {...form}>
        <form className="max-w-96 space-y-4 text-left" onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-posta Adresi</FormLabel>
                <FormControl>
                  <Input disabled {...field} id="email" type="email" required placeholder="mail@mail.com" />
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
        </form>
      </Form>
      <p className="mt-4 text-center text-muted-foreground">
        Hesabınız varsa{" "}
        <Link href="/login" className="underline hover:text-foreground">
          giriş yapın.
        </Link>
      </p>
    </div>
  );
};
