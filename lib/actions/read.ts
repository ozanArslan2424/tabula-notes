"use server";
import db from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  } catch {
    return null;
  }
};

export async function getAllBooks(userId: string) {
  const books = await db.book.findMany({
    where: {
      userId: userId,
    },
    include: {
      groups: true,
      tasks: true,
    },
  });
  return books;
}

export async function getBookContents(bookId: string) {
  const book = await db.book.findFirst({
    where: {
      id: bookId,
    },
    select: {
      userId: true,
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
              createdAt: true,
              updatedAt: true,
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

export async function getQuickNotes(userId: string) {
  const quicknotes = await db.quickNote.findMany({
    where: {
      userId: userId,
    },
  });
  return quicknotes;
}

export async function getBugs() {
  const bugs = await db.bug.findMany();
  return bugs;
}
