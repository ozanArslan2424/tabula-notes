"use server";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { getCurrentUser } from "./auth-read";

export async function getAllBooks() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (user && user.id) {
    const books = await db.book.findMany({
      where: {
        userId: user.id,
      },
    });
    return books;
  }
}

export async function getBookContents(bookId: string) {
  const book = await db.book.findFirst({
    where: {
      id: bookId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      hasTasks: true,
      createdAt: true,
      updatedAt: true,
      tasks: {
        select: {
          id: true,
          name: true,
          completed: true,
          bookId: true,
        },
      },
      groups: {
        select: {
          id: true,
          title: true,
          notes: {
            select: {
              id: true,
              content: true,
              tags: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  });
  return book;
}
