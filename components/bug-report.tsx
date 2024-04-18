"use client";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { registerBug } from "@/lib/actions/create";
import { sendBugNotification } from "@/lib/actions/mail.actions";
import { BugSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { BugIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

type Props = {
  menuItem?: boolean;
  userId: string;
};

export const BugReport = ({ userId, menuItem = false }: Props) => {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof BugSchema>>({
    resolver: zodResolver(BugSchema),
    defaultValues: {
      subject: "",
      description: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof BugSchema>) => {
    setOpen(false);
    registerBug(values, userId).then((data) => {
      if (data?.error) {
        toast.error(data?.error);
      }
      if (data?.success) {
        if (menuItem) {
          sendBugNotification(values.subject, values.description, userId);
        }
        toast.success(data?.success);
      }
    });
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>
        {menuItem ? (
          <DropdownMenuItem
            onClick={(e) => {
              e.preventDefault();
              setOpen(true);
            }}
          >
            <BugIcon size={14} className="mr-2" />
            Hata Bildir
          </DropdownMenuItem>
        ) : (
          <Button onClick={() => setOpen(true)}>
            <BugIcon size={14} className="mr-2" />
            Hata Bildir
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Hata Bildir</DialogTitle>
          <DialogDescription>
            Bulduğunuz hatayı detaylıca açıklayın. En kısa zamanda çözmeye çalışacağım :&#41;
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="flex w-full flex-col gap-4 p-4">
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Konu</FormLabel>
                  <FormControl>
                    <Input {...field} className="capitalize" required type="text" />
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
                    <Textarea {...field} required placeholder="Hatanın detaylı açıklamasını yazın" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button type="reset" variant="secondary">
                  Vazgeç
                </Button>
              </DialogClose>

              <Button type="submit">Gönder</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
