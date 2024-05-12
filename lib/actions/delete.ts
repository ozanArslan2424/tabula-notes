"use server";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteUser(userId: string) {
  try {
    await db.user.delete({
      where: {
        id: userId,
      },
    });
    await db.account.deleteMany({
      where: {
        userId: userId,
      },
    });
    await db.session.deleteMany({
      where: {
        userId: userId,
      },
    });
    return { success: "Kullanıcı başarıyla silindi" };
  } catch (error) {
    console.error("fail to del user", error);
  }
}

export async function deleteBook(bookId: string) {
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
}

export async function deleteNote(noteId: number, bookId: string) {
  try {
    await db.note.delete({
      where: {
        id: noteId,
      },
    });

    return { success: "Not başarıyla silindi" };
  } catch (error) {
    console.error("fail to del note", error);
    return { error: "Not silinemedi." };
  } finally {
    revalidatePath(`/dash/${bookId}`, "page");
  }
}

export async function deleteTask(taskId: number, bookId: string) {
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
}

export async function deleteQuickNote(quickNoteId: number) {
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
}
