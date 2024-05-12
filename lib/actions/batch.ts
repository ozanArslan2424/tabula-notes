"use server";

import { revalidatePath } from "next/cache";
import db from "../db";

export async function batchCreate(
  title: string,
  description: string,
  hasTasks: boolean,
  noteTitles: string[],
  userId: string,
) {
  try {
    const book = await db.book.create({
      data: {
        title,
        description,
        hasTasks,
        userId,
      },
      select: {
        id: true,
      },
    });

    await db.note.createMany({
      data: noteTitles.map((noteTitle) => ({
        title: noteTitle,
        bookId: book.id,
      })),
    });
    return { success: "Kitap başarıyla oluşturuldu." };
  } catch (error) {
    console.error("fail to batch create", error);
    return { error: "Kitap oluşturulamadı." };
  } finally {
    revalidatePath("/dash", "page");
  }
}
