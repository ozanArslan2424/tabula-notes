"use server";
import db from "@/lib/db";
import { BookFormSchema, BugSchema, NoteFormSchema, QuicknoteSchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";
import * as z from "zod";
import { getSession } from "../auth";

export async function createBook(values: z.infer<typeof BookFormSchema>) {
  const { user } = await getSession();
  try {
    const book = await db.book.create({
      data: {
        title: values.title,
        description: values.description,
        hasTasks: values.hasTasks,
        userId: user?.id!,
        notes: {
          create: {
            title: new Date().toLocaleDateString("tr-TR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            }),
          },
        },
      },
    });
    return { success: "Kitap başarıyla oluşturuldu.", id: book.id };
  } catch (error) {
    console.error("Failed to create book:", error);
    return { error: "Kitap oluşturulamadı." };
  }
}

export async function createNewNote(values: z.infer<typeof NoteFormSchema>, bookId: string) {
  try {
    await db.note.create({
      data: {
        title: values.title,
        bookId: bookId,
      },
    });

    return { success: "Not başarıyla oluşturuldu." };
  } catch (error) {
    return { error: "Not oluşturulamadı." };
  } finally {
    revalidatePath(`/dash/${bookId}`, "page");
  }
}

export async function createNewTask(userId: string, bookId: string, name: string) {
  try {
    const task_ids = await db.task.create({
      data: {
        userId: userId,
        bookId: bookId,
        name: name,
      },
    });

    return task_ids.id;
  } catch (error) {
    console.error("Failed to create:", error);
  } finally {
    revalidatePath(`/dash/${bookId}`, "page");
  }
}

export async function createQuicknote(values: z.infer<typeof QuicknoteSchema>) {
  const { user } = await getSession();
  try {
    await db.quickNote.create({
      data: {
        content: values.name,
        userId: user?.id!,
      },
    });
  } catch (error) {
    console.error("Failed to create quicknote:", error);
  } finally {
    revalidatePath("/dash", "page");
  }
}

export async function registerBug(values: z.infer<typeof BugSchema>, userId: string) {
  try {
    await db.bug.create({
      data: {
        subject: values.subject,
        description: values.description,
        userId,
      },
    });
    return { success: "Hata başarıyla bildirildi." };
  } catch (error) {
    console.error("Failed to create bug:", error);
    return { error: "Hata bildirilirken bir hata oluştu..." };
  } finally {
    revalidatePath("/admin", "page");
  }
}
