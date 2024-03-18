"use client";
import { updateUserSettings } from "@/actions/update";
import { emailChangeAction } from "@/actions/user";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LoginSchema, SettingsSchema } from "@/lib/schemas";
import { UploadButton } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { MailCheckIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "../ui/button";
import { LoadingIcon, LoadingIcon2 } from "../ui/custom-loading";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

type Props = {};

export const SettingsForm = (props: Props) => {
  const user = useCurrentUser();
  if (!user) redirect("/login");
  const userEmail = user.email;

  const [isPending, startTransition] = useTransition();
  const { update } = useSession();

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user?.name || undefined,
      image: user?.image || undefined,
    },
  });

  const handleUserSettingsSubmit = (values: z.infer<typeof SettingsSchema>) => {
    startTransition(async () => {
      updateUserSettings(values).then((data) => {
        if (data.success) {
          update();
          toast.success(data.success);
        }
        if (data.error) {
          toast.error(data.error);
        }
      });
    });
  };

  const buttonDefaultStyling =
    "ut-button:border ut-button:border-input ut-button:bg-secondary ut-button:text-secondary-foreground ut-button:shadow-sm ut-button:sm:hover:bg-accent ut-button:sm:hover:text-accent-foreground ut-button:inline-flex ut-button:items-center ut-button:justify-center ut-button:whitespace-nowrap ut-button:rounded-md ut-button:text-sm ut-button:font-medium ut-button:transition-colors ut-button:focus-visible:outline-none ut-button:focus-visible:ring-1 ut-button:focus-visible:ring-ring ut-button:disabled:pointer-events-none ut-button:disabled:opacity-50 ut-button:h-9 ut-button:px-4 ut-button:py-2";

  return (
    <div>
      <h1 className="mb-2 text-center text-3xl font-bold">Hesap Ayarları</h1>
      <p className="mb-4 text-center text-muted-foreground">
        Ayarlarınızı değiştirdikten sonra kaydetmeyi unutmayın.
      </p>
      {user.role === "ADMIN" && (
        <p className="mx-auto mb-4 w-min rounded-sm bg-emerald-500 px-2 py-1 text-center text-xs text-white">
          Admin
        </p>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleUserSettingsSubmit)}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="image" className="pointer-events-none">
                    Profil Resmi
                  </FormLabel>
                  <div className="flex gap-4">
                    <div>
                      <Image
                        src={field.value || "/default-img.jpg"}
                        alt="Profil Resmi"
                        width={100}
                        height={100}
                        className="rounded-md border shadow"
                      />
                    </div>
                    <div className="flex w-full flex-col gap-2">
                      <FormControl>
                        <Input
                          {...field}
                          disabled
                          id="image"
                          className="pointer-events-none cursor-not-allowed touch-none select-none"
                        />
                      </FormControl>
                      {user.role === "ADMIN" ? (
                        <UploadButton
                          className={
                            buttonDefaultStyling +
                            "flex flex-row justify-between space-x-4 text-nowrap pr-4 ut-button:w-full"
                          }
                          content={{ button: "Resim Yükle", allowedContent: "Maximum 4MB" }}
                          endpoint="imageUploader"
                          onClientUploadComplete={(res) => {
                            console.log("Files: ", res);
                            res[0].url && form.setValue("image", res[0].url);
                          }}
                          onUploadError={(error: Error) => {
                            alert(`ERROR! ${error.message}`);
                          }}
                        />
                      ) : (
                        <p className="text-center text-sm text-muted-foreground">
                          Resim yükleme sadece adminler için aktiftir.
                        </p>
                      )}
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">Kullanıcı Adı</FormLabel>
                  <FormControl>
                    <Input {...field} id="name" autoComplete="off" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="mt-2 w-full" type="submit" disabled={isPending}>
              {isPending ? <LoadingIcon2 /> : "Kaydet"}
            </Button>
          </div>
        </form>
      </Form>
      <EmailForm userEmail={userEmail!} />
    </div>
  );
};

const EmailForm = ({ userEmail }: { userEmail: string }) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: userEmail || undefined,
    },
  });

  const handleEmailSubmit = (values: z.infer<typeof LoginSchema>) => {
    startTransition(async () => {
      emailChangeAction(values).then((data) => {
        if (data?.error) {
          toast.error(data.error);
        }
        if (data?.success) {
          toast.success(data.success);
        }
      });
    });
  };

  return (
    <Form {...form}>
      <form className="mt-8" onSubmit={form.handleSubmit(handleEmailSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">E-Posta</FormLabel>
              <FormDescription>
                E-posta adresinizi değiştirmek için onay e-postası gönderilecektir.
              </FormDescription>
              <div className="flex items-center gap-2">
                <FormControl>
                  <Input {...field} id="email" type="email" autoComplete="email" />
                </FormControl>
                <Button size="icon" type="submit" disabled={isPending}>
                  {isPending ? <LoadingIcon /> : <MailCheckIcon size={16} />}
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
