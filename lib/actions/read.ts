"use server";
import db from "@/lib/db";
import { getSession } from "../auth";

export async function getAllBooks() {
  const { user } = await getSession();
  if (user && user.id) {
    const books = await db.book.findMany({
      where: {
        userId: user.id,
      },
      include: {
        groups: true,
        tasks: true,
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
            },
          },
        },
      },
    },
  });
  return book;
}
