"use server";
import { db } from "@/lib/db";
import { TagType } from "@/lib/types";
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

export const deleteNote = async ({
  noteId,
  groupId,
  bookId,
}: {
  noteId: number;
  groupId: number;
  bookId: string;
}) => {
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

export const deleteUnusedTags = async (deletedTags: TagType[]) => {
  try {
    const unusedTags = await db.tag.findMany({
      where: {
        name: {
          in: deletedTags.map((tag) => tag.name),
        },
        note: {
          none: {},
        },
      },
    });

    await db.tag.deleteMany({
      where: {
        id: {
          in: unusedTags.map((tag) => tag.id),
        },
      },
    });

    return { success: "Unused tags deleted successfully" };
  } catch (error) {
    console.error("Failed to delete unused tags", error);
    return { error: "Failed to delete unused tags" };
  }
};
