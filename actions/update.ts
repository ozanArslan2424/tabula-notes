"use server";
import { db } from "@/lib/db";
import { TagType } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "./auth-read";

export const changeBookProps = async ({
  bookId,
  title,
  description,
}: {
  bookId: string;
  title: string;
  description: string;
}) => {
  try {
    await db.book.update({
      where: {
        id: bookId,
      },
      data: {
        title,
        description,
      },
    });
    return { success: "Kitap bilgileri değiştirildi." };
  } catch (error) {
    console.error("Failed to update:", error);
    return { error: "Kitap güncellenemedi." };
  } finally {
    revalidatePath("/dash");
  }
};

export const changeGroupTitle = async (groupId: number, title: string) => {
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
    console.error("Failed to update:", error);
    return { error: "İsim değiştirilemedi." };
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
          deleteMany: deletedTags.map((tag) => ({ name: tag.name })),
        },
      },
    });
  } catch (error) {
    console.error("Failed to update note tags:", error);
    return { error: "Etiketler (nedense) kaydedilemedi." };
  }
}
