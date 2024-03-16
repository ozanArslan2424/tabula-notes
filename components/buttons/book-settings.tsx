"use client";
import { deleteBook } from "@/actions/delete";
import { updateBookSettings } from "@/actions/update";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { BookFormSchema } from "@/lib/schemas";
import { BookType } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Settings2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { LoadingIcon2 } from "../custom-loading";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";

export const BookSettings = ({ currentBook }: { currentBook: BookType }) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const form = useForm<z.infer<typeof BookFormSchema>>({
    resolver: zodResolver(BookFormSchema),
    defaultValues: {
      title: currentBook.title,
      description: currentBook.description || "",
      hasTasks: currentBook.hasTasks,
    },
  });

  const handleSubmit = (values: z.infer<typeof BookFormSchema>) => {
    startTransition(() => {
      updateBookSettings(currentBook.id, values).then((data) => {
        if (data?.error) {
          toast.error(data?.error);
        }
        if (data?.success) {
          toast.success(data?.success);
          setOpen(false);
        }
      });
    });
  };
  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>
        <Button className="h-7 bg-background text-foreground" size="sm" variant="outline">
          <Settings2Icon className="mr-2" size={14} />
          Kitap Ayarları
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Kitap Ayarları</DialogTitle>
          <DialogDescription>
            Tercihlerini değiştirdikten sonra kaydetmeyi unutma.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex w-full flex-col gap-2 p-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kitap Adı</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="capitalize"
                      required
                      type="text"
                      placeholder="Kitap Adı"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Açıklama</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Kısa Bir Açıklama"
                      disabled={isPending}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hasTasks"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <Checkbox
                      className="mt-2"
                      defaultChecked={field.value}
                      disabled={isPending}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="cursor-pointer">Yapılacaklar listesi</FormLabel>
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2">
              <Button size="sm" variant="custom_destructive" onClick={() => setOpen(false)}>
                Vazgeç
              </Button>
              <Button size="sm" disabled={isPending} type="submit">
                {isPending ? <LoadingIcon2 /> : "Kaydet"}
              </Button>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="w-max hover:bg-destructive"
              onClick={() => {
                startTransition(() => {
                  deleteBook(currentBook.id!).then(() => {
                    router.push("/dash");
                  });
                });
              }}
            >
              {isPending ? <LoadingIcon2 /> : "Kitabı Sil"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
