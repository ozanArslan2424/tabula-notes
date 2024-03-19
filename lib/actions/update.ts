"use server";
import db from "@/lib/db";
import { BookFormSchema, SettingsSchema } from "@/lib/schemas";
import bcryptjs from "bcryptjs";
import { revalidatePath } from "next/cache";
import * as z from "zod";
import { getCurrentUser, getUserById } from "./user";

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

  if (!user) {
    return { error: "Kullanıcı bulunamadı." };
  }

  const dbUser = await getUserById(user.id);
  if (!dbUser) {
    return { error: "Kullanıcı bulunamadı." };
  }

  if (values.newPassword && dbUser.password) {
    const passwordsMatch = dbUser.password === values.newPassword;

    if (passwordsMatch) {
      return { error: "Aynı şifreyi girdiniz." };
    }

    const hashedPassword = await bcryptjs.hash(values.newPassword, 10);
    await db.user.update({
      where: {
        id: dbUser.id,
      },
      data: {
        name: values.name,
        image: values.image,
        password: hashedPassword,
      },
    });
  }
  return { success: "Ayarlar güncellendi." };
}
