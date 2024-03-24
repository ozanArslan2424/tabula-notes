"use client";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Login } from "@/lib/actions/auth.actions";
import { LoginSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { GithubButton, GoogleButton } from "../buttons/oauth-buttons";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export const LoginForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof LoginSchema>) => {
    startTransition(async () => {
      await Login(values).then((data) => {
        if (data.error) {
          toast.error(data.error);
        }
        if (data.success) {
          toast.success(data.success);
          redirect("/dash");
        }
      });
    });
  };

  return (
    <>
      <h1 className="mb-4 text-center text-3xl font-bold">Giriş Yap</h1>

      <Form {...form}>
        <form className="min-w-96 space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-posta Adresi</FormLabel>
                <FormControl>
                  <Input disabled={isPending} {...field} id="email" type="email" required placeholder="mail@mail.com" />
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
                  <Input disabled={isPending} {...field} id="password" type="password" required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit" disabled={isPending}>
            {isPending ? "Giriş yapılıyor..." : "Giriş Yap"}
          </Button>

          <div className="my-4 flex items-center gap-2">
            <div className="h-0.5 w-full bg-accent"></div>
            <p className="text-primary">veya</p>
            <div className="h-0.5 w-full bg-accent"></div>
          </div>
          <GoogleButton />
          <GithubButton />
        </form>
      </Form>
      <p className="mt-4 text-center text-muted-foreground">
        Hesabınız yoksa{" "}
        <Link href="/register" className="underline hover:text-foreground">
          kaydolun.
        </Link>
      </p>
    </>
  );
};
