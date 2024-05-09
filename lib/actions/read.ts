"use server";
import db from "@/lib/db";

export async function getUserByEmail(email: string) {
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
}

export async function getUserById(id: string) {
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
}

export async function getAllBooks(userId: string) {
  const books = await db.book.findMany({
    where: {
      userId: userId,
    },
    include: {
      groups: {
        include: {
          notes: true,
        },
      },
      tasks: true,
    },
  });
  return books;
}

export async function getBookList(userId: string) {
  const books = await db.book.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      title: true,
    },
  });
  return books;
}

export async function getAllBookInfo(userId: string) {
  const books = await db.book.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      userId: true,
      title: true,
      description: true,
      createdAt: true,
      updatedAt: true,
      hasTasks: true,
      _count: {
        select: {
          groups: true,
          tasks: true,
        },
      },
    },
  });
  return books;
}

export async function getBookContent(bookId: string) {
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
          createdAt: true,
          notes: {
            select: {
              id: true,
              content: true,
              createdAt: true,
              updatedAt: true,
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
