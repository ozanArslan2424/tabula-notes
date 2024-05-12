"use client";
import { LoadingIcon2 } from "@/components/custom-loading";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { deleteBook } from "@/lib/actions/delete";
import { updateBookSettings } from "@/lib/actions/update";
import { BookFormSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { DropdownMenuItem } from "../ui/dropdown-menu";

type Props = {
  bookId: string;
  bookTitle: string;
  bookDescription: string | null;
  bookHasTasks: boolean;
  children: React.ReactNode;
};

export default function BookSettings({ bookId, bookTitle, bookDescription, bookHasTasks, children }: Props) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const form = useForm<z.infer<typeof BookFormSchema>>({
    resolver: zodResolver(BookFormSchema),
    defaultValues: {
      title: bookTitle,
      description: bookDescription || "",
      hasTasks: bookHasTasks,
    },
  });

  const handleSubmit = (values: z.infer<typeof BookFormSchema>) => {
    startTransition(() => {
      updateBookSettings(bookId, values).then((data) => {
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
        <DropdownMenuItem
          onClick={(e) => {
            e.preventDefault();
            setOpen(true);
          }}
          className="flex items-center gap-2"
        >
          {children}
        </DropdownMenuItem>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Kitap Ayarları</DialogTitle>
          <DialogDescription>Tercihlerini değiştirdikten sonra kaydetmeyi unutma.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="flex w-full flex-col gap-4 p-4">
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
                    <Input {...field} type="text" placeholder="Kısa Bir Açıklama" disabled={isPending} />
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

            <DialogFooter>
              <DialogClose asChild>
                <Button type="reset" variant="secondary">
                  Vazgeç
                </Button>
              </DialogClose>

              <Button disabled={isPending} type="submit">
                {isPending ? <LoadingIcon2 /> : "Kaydet"}
              </Button>
            </DialogFooter>
            <div className="mt-4 rounded-md border border-dashed border-destructive/50 bg-destructive/5 p-4">
              <p className="text-destructive">Dikkat!</p>
              <p className="text-sm">Kitabı silmek için aşağıdaki butona tıklayın. Bu işlem geri alınamaz.</p>
              <Button
                type="button"
                variant="destructive"
                className="mt-4"
                onClick={() => {
                  startTransition(() => {
                    deleteBook(bookId!).then(() => {
                      router.push("/dash");
                    });
                  });
                }}
              >
                {isPending ? <LoadingIcon2 /> : "Kitabı Sil"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
