"use server";
import db from "@/lib/db";
import { BookFormSchema, QuicknoteSchema } from "@/lib/schemas";
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
      },
    });
    return { success: "Kitap başarıyla oluşturuldu.", id: book.id };
  } catch (error) {
    console.error("Failed to create book:", error);
    return { error: "Kitap oluşturulamadı." };
  }
}

export async function createNewGroup({ title, bookId }: { title: string; bookId: string }) {
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

export async function createQuicknote(values: z.infer<typeof QuicknoteSchema>) {
  const { user } = await getSession();
  try {
    await db.quickNote.create({
      data: {
        content: values.content,
        userId: user?.id!,
      },
    });
  } catch (error) {
    console.error("Failed to create quicknote:", error);
  } finally {
    revalidatePath("/dash", "page");
  }
}
