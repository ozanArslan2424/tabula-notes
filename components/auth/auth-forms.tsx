"use client";
import {
  deleteAccount,
  loginAction,
  newPasswordAction,
  newVerificationAction,
  passwordResetAction,
  registerAction,
  updateSettings,
} from "@/actions/auth-actions";
import { AuthCardWrapper } from "@/components/auth/auth-card-wrapper";
import { FormActionRequired, FormError, FormSuccess } from "@/components/auth/form-toast";
import { LoadingIcon } from "@/components/custom-loading";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LoginSchema, NewPasswordSchema, PasswordResetSchema, RegisterSchema, SettingsSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserRole } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { LinkButton } from "../buttons/link-button";
import { CardContent, CardFooter } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Switch } from "../ui/switch";

export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      registerAction(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <AuthCardWrapper
      headerLabel="Yeni Hesap Oluştur"
      routeLinkLabel="Hesabın var mı? Giriş yap."
      routeLinkHref="/login"
    >
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kullanıcı Adı</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} placeholder="Kübrik" type="text" autoComplete="username" />
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
                  <FormLabel>E-Posta</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="sahneler.mail@ornek.com"
                      type="email"
                      autoComplete="email"
                    />
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
                    <Input {...field} disabled={isPending} placeholder="********" type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type="submit" size="lg" className="w-full">
            {isPending ? <LoadingIcon /> : "Hesap Oluştur"}
          </Button>
        </form>
      </Form>
    </AuthCardWrapper>
  );
};

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked" ? "Email hesabı başka bir sosyal medya hesabına bağlı." : "";

  const [showTwoFactor, setShowTwoFactor] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>("");
  const [actionRequired, setActionRequired] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setActionRequired("");

    startTransition(() => {
      loginAction(values, callbackUrl)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data?.error);
          }

          if (data?.actionRequired) {
            form.reset();
            setActionRequired(data?.actionRequired);
          }

          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch(() => setError("Bir hata oluştu."));
    });
  };

  return (
    <AuthCardWrapper
      headerLabel="Giriş Yap"
      routeLinkLabel="Hesabın yoksa kaydol."
      routeLinkHref="/register"
      showSocialButtons={showTwoFactor ? false : true}
    >
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          {!showTwoFactor && (
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-Posta</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="sahneler.mail@ornek.com"
                        type="email"
                        autoComplete="email"
                      />
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
                      <Input {...field} disabled={isPending} placeholder="********" type="password" />
                    </FormControl>
                    <LinkButton variant="link" className="px-0" size="sm" href="/passwordreset">
                      Şifremi Unuttum
                    </LinkButton>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          {showTwoFactor && (
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>İki faktörlü kimlik doğrulama kodu</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} placeholder="123456" type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormError message={error || urlError} />
          <FormActionRequired message={actionRequired} />
          <Button disabled={isPending} type="submit" size="lg" className="w-full">
            {isPending ? <LoadingIcon /> : "Giriş Yap"}
          </Button>
        </form>
      </Form>
    </AuthCardWrapper>
  );
};

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;
    if (!token) {
      setError("Doğrulama kodu bulunamadı.");
      return;
    }

    newVerificationAction(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Bir hata oluştu.");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <AuthCardWrapper
      headerLabel="E-posta Doğrulama"
      routeLinkHref="/login"
      routeLinkLabel="Giriş sayfasına dön."
      showSocialButtons={false}
    >
      <div className="my-6 flex w-full items-center justify-center">
        {!success && !error && <LoadingIcon />}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </div>
    </AuthCardWrapper>
  );
};

export const PasswordResetForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof PasswordResetSchema>>({
    resolver: zodResolver(PasswordResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof PasswordResetSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      passwordResetAction(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <AuthCardWrapper
      headerLabel="Şifreni Değiştir"
      routeLinkLabel="Giriş sayfasına dön."
      routeLinkHref="/login"
      showSocialButtons={false}
    >
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-Posta</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="senaryolar.mail@ornek.com"
                      type="email"
                      autoComplete="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          {!success && (
            <Button disabled={isPending} type="submit" size="lg" className="w-full">
              {isPending ? <LoadingIcon /> : "Şifre Sıfırlama Linki Gönder"}
            </Button>
          )}
        </form>
      </Form>
    </AuthCardWrapper>
  );
};

export const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      newPasswordAction(values, token).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <AuthCardWrapper
      headerLabel="Yeni Şifre Belirle"
      routeLinkLabel="Giriş sayfasına dön."
      routeLinkHref="/login"
      showSocialButtons={false}
    >
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Yeni Şifre</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="********"
                      type="password"
                      autoComplete="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          {!success && (
            <Button disabled={isPending} type="submit" size="lg" className="w-full">
              {isPending ? <LoadingIcon /> : "Şifremi Değiştir"}
            </Button>
          )}
        </form>
      </Form>
    </AuthCardWrapper>
  );
};

export const SettingsForm = () => {
  const user = useCurrentUser();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user?.name || undefined,
      email: user?.email || undefined,
      password: undefined,
      newPassword: undefined,
      role: user?.role || undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled || false,
    },
  });

  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    startTransition(() => {
      updateSettings(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }

          if (data.success) {
            update();
            setSuccess(data.success);
          }
        })
        .catch(() => setError("Bir hata oluştu."));
    });
  };

  // ! DANGER
  const handleAccountDeletion = () => {
    deleteAccount(user?.id!);
  };
  // ! DANGER

  return (
    <>
      <CardContent>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kullanıcı Adı</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isPending} placeholder="Ali Veli" />
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
                    <FormLabel>E-Posta</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending || user?.isOAuth}
                        placeholder="sahneler.mail@ornek.com"
                        type="email"
                        autoComplete="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {user?.isOAuth === false && (
                <>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Geçerli Şifre</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="********"
                            type="password"
                            autoComplete="password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Yeni Şifre</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="********"
                            type="password"
                            autoComplete="password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              {user?.isOAuth && (
                <div className="rounded-lg border p-3 shadow-sm dark:bg-accent">
                  <p className="text-sm text-muted-foreground">
                    Hesabınız bir sağlayıcıya bağlı olduğu için
                    <br /> e-postanızı veya şifrenizi değiştiremezsiniz.
                  </p>
                </div>
              )}

              <FormField
                control={form.control}
                name="isTwoFactorEnabled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between space-y-0 rounded-lg border p-3 shadow-sm dark:bg-accent">
                    <div className="space-y-0.5">
                      <FormLabel>İki faktörlü doğrulama</FormLabel>
                      <FormDescription>İki faktörlü kimlik doğrulamayı aç.</FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        defaultChecked={field.value}
                        disabled={isPending}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Yetki</FormLabel>
                    <Select disabled={isPending} onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Yetki belirle" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                        <SelectItem value={UserRole.USER}>Kullanıcı</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormSuccess message={success} />
            <FormError message={error} />
            <Button size="lg" disabled={isPending} type="submit">
              {isPending ? <LoadingIcon /> : "Kaydet"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size="sm" variant="link" className="ml-auto text-red-500">
              Hesabını Sil
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Hesabını silmek istediğine emin misin?</AlertDialogTitle>
              <AlertDialogDescription>
                Hesabını sildiğinde tüm verilerin <b>kalıcı</b> olarak silinecek. <br />
                Bütün kitapların, grupların ve notların yok olacak ve <b>bir daha asla geri dönmeyecek</b>. <br />
                <br />
                <span className="text-red-500">
                  Bu işlem <b>hemen</b> gerçekleşir. Diğer sitelerdeki gibi 3 gün bekleme süresi vb. <b>yok</b>.
                </span>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Vazgeç</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleAccountDeletion}
                className="bg-destructive text-destructive-foreground hover:text-red-500"
              >
                Hesabımı Sil
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </>
  );
};
