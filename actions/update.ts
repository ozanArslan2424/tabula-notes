"use server";
import { db } from "@/lib/db";
import { BookFormSchema } from "@/lib/schemas";
import { TagType } from "@/lib/types";
import { revalidatePath } from "next/cache";
import * as z from "zod";
import { getCurrentUser } from "./auth-read";

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

export async function updateNoteTags({
  noteId,
  tags,
  deletedTags,
}: {
  noteId: number;
  tags: TagType[];
  deletedTags: TagType[];
}) {
  const user = await getCurrentUser();
  try {
    await db.note.update({
      where: {
        id: noteId,
      },
      data: {
        tags: {
          connectOrCreate: tags.map((tag) => ({
            where: { name: tag.name },
            create: { name: tag.name, userId: user?.id! },
          })),
          deleteMany: {
            name: {
              in: deletedTags.map((tag) => tag.name),
            },
          },
        },
      },
    });
  } catch (error) {
    console.error("Failed to update note tags:", error);
    return { error: "Etiketler (nedense) kaydedilemedi." };
  }
}

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
