"use client";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { createBook } from "@/lib/actions/create";
import { BookFormSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { LoadingIcon2 } from "../ui/custom-loading";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";

export const CreateBookButton = ({ width }: { width: string }) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof BookFormSchema>>({
    resolver: zodResolver(BookFormSchema),
    defaultValues: {
      title: "",
      description: "",
      hasTasks: false,
    },
  });

  const handleSubmit = (values: z.infer<typeof BookFormSchema>) => {
    startTransition(() => {
      createBook(values).then((data) => {
        if (data?.error) {
          toast.error(data?.error);
        }
        if (data?.success) {
          toast.success(data?.success);
          form.reset();
          setOpen(false);
          router.push(`/dash/${data.id}`);
        }
      });
    });
  };
  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className={`${width} justify-start space-x-3 bg-background text-foreground`}
        >
          <PlusCircleIcon size={14} className="shrink-0" />
          <span>Kitap Oluştur</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Yeni Kitap Oluştur</DialogTitle>
          <DialogDescription>Kitap adı 2-100 karakter arasında olmalı.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="flex w-full flex-col gap-2 p-4">
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

            <div className="flex justify-end gap-2">
              <Button size="sm" variant="custom_destructive" onClick={() => setOpen(false)}>
                Vazgeç
              </Button>
              <Button size="sm" disabled={isPending} type="submit">
                {isPending ? <LoadingIcon2 /> : "Kaydet"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
