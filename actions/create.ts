"use server";
import { getEmailChangeTokenByEmail } from "@/actions/user";
import db from "@/lib/db";
import { BookFormSchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";
import { v4 } from "uuid";
import * as z from "zod";
import { getCurrentUser } from "./user";

export const generateEmailChangeToken = async (email: string) => {
  const token = v4();
  const expires = new Date(new Date().getTime() + 3600 * 1000); // 1 hour
  const user = await getCurrentUser();
  const existingToken = await getEmailChangeTokenByEmail(email);

  if (existingToken) {
    await db.emailChangeToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const emailChangeToken = await db.emailChangeToken.create({
    data: {
      email,
      token,
      expires,
      userId: user?.id,
    },
  });

  return emailChangeToken;
};

export async function createBook(values: z.infer<typeof BookFormSchema>) {
  const user = await getCurrentUser();
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
