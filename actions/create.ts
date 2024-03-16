"use server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const createNewBook = async ({
  title,
  description,
  userId,
}: {
  title: string;
  description: string;
  userId: string;
}) => {
  if (!userId) {
    return { error: "Giriş yaptığınıza emin olun!" };
  }
  if (!title) {
    return { error: "Kitap adı boş olamaz" };
  }
  if (title.length < 2) {
    return { error: "Kitap adı 2 karakterden kısa olamaz" };
  }
  if (title.length > 100) {
    return { error: "Kitap adı 100 karakterden uzun olamaz" };
  }
  if (title && title.length <= 100 && title.length >= 2) {
    try {
      const newBook = await db.book.create({
        data: {
          title: title,
          description: description,
          userId: userId,
        },
        select: { id: true },
      });
      return { success: "Kitap başarıyla oluşturuldu", id: newBook.id };
    } catch (error) {
      console.error("Failed to create:", error);
      return { error: "Beklenmeyen bir sorun çıktı." };
    } finally {
      revalidatePath("/dash", "page");
    }
  }
};

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
      revalidatePath(`/dash/${bookId}`);
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
    revalidatePath(`/dash/${bookId}`);
  }
}
