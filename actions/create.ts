"use server";
import { db } from "@/lib/db";
import { BookFormSchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";
import * as z from "zod";
import { getCurrentUser } from "./auth-read";

export async function createBook(values: z.infer<typeof BookFormSchema>) {
  const user = await getCurrentUser();
  try {
    const book = await db.book.create({
      data: {
        title: values.title,
        description: values.description,
        hasTasks: values.hasTasks,
        userId: user?.id!,
      },
    });
    return { success: "Kitap başarıyla oluşturuldu.", id: book.id };
  } catch (error) {
    console.error("Failed to create book:", error);
    return { error: "Kitap oluşturulamadı." };
  }
}

export async function createNewGroup({ title, bookId }: { title: string; bookId: string }) {
  if (!title) {
    return { error: "Grup adı boş olamaz" };
  }
  if (title.length < 2) {
    return { error: "Grup adı 2 karakterden kısa olamaz" };
  }
  if (title.length > 100) {
    return { error: "Grup adı 100 karakterden uzun olamaz" };
  }
  if (title && title.length <= 100 && title.length >= 2) {
    try {
      await db.group.create({
        data: {
          title: title,
          bookId: bookId,
        },
      });
      return { success: "Grup başarıyla oluşturuldu" };
    } catch (error) {
      console.error("Failed to create:", error);
      return { error: "Beklenmeyen bir sorun çıktı." };
    } finally {
      revalidatePath(`/dash/${bookId}`, "page");
    }
  }
}

export async function createNewNote({ bookId, groupId }: { bookId: string; groupId: number }) {
  try {
    const note_ids = await db.note.create({
      data: {
        groupId: groupId,
      },
    });

    return note_ids.id;
  } catch (error) {
    console.error("Failed to create:", error);
  } finally {
    revalidatePath(`/dash/${bookId}`, "page");
  }
}

export async function createNewTask({ bookId, name }: { bookId: string; name: string }) {
  try {
    const task_ids = await db.task.create({
      data: {
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
