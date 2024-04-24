"use client";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { changeSettings } from "@/lib/actions/auth.actions";
import { SettingsSchema } from "@/lib/schemas";
import { UserType } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { LoadingIcon2 } from "../custom-loading";
import { ErrorMessage, SuccessMessage } from "../errors";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export const SettingsForm = ({ user }: { user: UserType }) => {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      email: user?.email,
      username: user?.username,
      password: "",
      newPassword: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof SettingsSchema>) => {
    startTransition(async () => {
      changeSettings(values).then((data) => {
        if (data.error) {
          setError(data.error);
        }
        if (data.success) {
          setSuccess(true);
        }
      });
    });
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
        {success && !error && (
          <SuccessMessage>Ayarlarınız değiştirildi. Doğrulama için e-posta adresinizi kontrol edin.</SuccessMessage>
        )}
        {error && !success && <ErrorMessage>{error}</ErrorMessage>}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-posta adresi</FormLabel>
              <FormControl>
                <Input disabled={isPending} {...field} id="email" type="email" required />
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
              <FormLabel>Kullanıcı adı</FormLabel>
              <FormControl>
                <Input disabled={isPending} {...field} id="username" type="text" required />
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
              <FormLabel>
                Şifre
                <span className="text-red-500"> *</span>
              </FormLabel>
              <FormControl>
                <Input disabled={isPending} {...field} id="password" type="password" required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit" disabled={isPending}>
          {isPending ? <LoadingIcon2 /> : "Kaydet"}
        </Button>
      </form>
    </Form>
  );
};

export const PictureForm = ({ user }: { user: UserType }) => {
  return (
    <div className="flex items-center space-x-4">
      {user?.image ? (
        <Image width={96} height={96} src={user?.image} alt={user?.username} className="h-24 w-24 rounded-lg" />
      ) : (
        <div className="flex h-24 w-24 items-center justify-center rounded-lg bg-gray-200">
          <span className="text-gray-500">Resim yok</span>
        </div>
      )}
      <div></div>
    </div>
  );
};
