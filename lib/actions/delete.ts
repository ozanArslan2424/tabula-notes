"use server";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export const deleteBook = async (bookId: string) => {
  try {
    await db.book.delete({
      where: {
        id: bookId,
      },
    });

    return { success: "Kitap başarıyla silindi" };
  } catch (error) {
    console.error("fail to del book", error);
    return { error: "Kitap silinemedi." };
  } finally {
    revalidatePath("/dash", "page");
  }
};

export const deleteGroup = async ({ groupId, bookId }: { groupId: number; bookId: string }) => {
  try {
    await db.group.delete({
      where: {
        id: groupId,
        bookId: bookId,
      },
    });

    return { success: "Grup başarıyla silindi" };
  } catch (error) {
    console.error("fail to del group", error);
    return { error: "Grup silinemedi." };
  } finally {
    revalidatePath(`/dash/${bookId}`, "page");
  }
};

export const deleteNote = async ({ noteId, groupId, bookId }: { noteId: number; groupId: number; bookId: string }) => {
  try {
    await db.note.delete({
      where: {
        id: noteId,
        groupId: groupId,
      },
    });

    return { success: "Not başarıyla silindi" };
  } catch (error) {
    console.error("fail to del note", error);
    return { error: "Not silinemedi." };
  } finally {
    revalidatePath(`/dash/${bookId}`, "page");
  }
};

export const deleteTask = async ({ taskId, bookId }: { taskId: number; bookId: string }) => {
  try {
    await db.task.delete({
      where: {
        id: taskId,
      },
    });

    return { success: "Yapılacak başarıyla silindi" };
  } catch (error) {
    console.error("fail to del task", error);
    return { error: "Yapılacak silinemedi." };
  } finally {
    revalidatePath(`/dash/${bookId}`, "page");
  }
};

export const deleteQuickNote = async (quickNoteId: number) => {
  try {
    await db.quickNote.delete({
      where: {
        id: quickNoteId,
      },
    });
  } catch (error) {
    console.error("fail to del quicknote", error);
  } finally {
    revalidatePath("/dash", "page");
  }
};
