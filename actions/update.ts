"use server";
import db from "@/lib/db";
import { BookFormSchema, SettingsSchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";
import * as z from "zod";
import { getCurrentUser } from "./user";

export const updateGroupTitle = async (groupId: number, title: string) => {
  try {
    await db.group.update({
      where: {
        id: groupId,
      },
      data: {
        title,
      },
    });
    return { success: "Grup ismi değiştirildi." };
  } catch (error) {
    console.error("Failed to change group title:", error);
  }
};

export const updateNote = async (noteId: number, editorContent: string) => {
  try {
    await db.note.update({
      where: {
        id: noteId,
      },
      data: {
        content: editorContent,
      },
    });
    return { success: "note updated" };
  } catch (error) {
    console.error("Failed to update:", error);
    return { error: "Bir şeyler yanlış gitti." };
  }
};

export async function updateTask({ taskId, completed }: { taskId: number; completed: boolean }) {
  try {
    await db.task.update({
      where: {
        id: taskId,
      },
      data: {
        completed,
      },
    });
    return { success: "OKEYTOOO." };
  } catch (error) {
    console.error("Failed to update task:", error);
    return { error: "Yapılacak madde güncellenemedi." };
  }
}

export async function updateBookSettings(bookId: string, values: z.infer<typeof BookFormSchema>) {
  try {
    await db.book.update({
      where: {
        id: bookId,
      },
      data: {
        title: values.title,
        description: values.description,
        hasTasks: values.hasTasks,
      },
    });
    return { success: "Kitap ayarları güncellendi." };
  } catch (error) {
    console.error("Failed to update book settings:", error);
    return { error: "Kitap ayarları güncellenemedi." };
  } finally {
    revalidatePath(`/dash/${bookId}`, "page");
  }
}

export async function updateUserSettings(values: z.infer<typeof SettingsSchema>) {
  const user = await getCurrentUser();
  try {
    await db.user.update({
      where: {
        id: user?.id,
      },
      data: {
        name: values.name,
        image: values.image,
      },
    });
    return { success: "Kullanıcı ayarları güncellendi." };
  } catch (error) {
    console.error("Failed to update user settings:", error);
    return { error: "Kullanıcı ayarları güncellenemedi." };
  }
}
