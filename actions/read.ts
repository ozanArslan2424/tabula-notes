"use server";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { getCurrentUser } from "./auth-read";

export async function getBookById({ id }: { id: string }) {
  const book = await db.book.findUnique({
    where: {
      id: id,
    },
  });
  return book;
}

export async function getGroupById(id: number) {
  const group = await db.group.findUnique({
    where: {
      id: id,
    },
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
  });
  return group;
}

export async function getNoteById(id: number) {
  const note = await db.note.findUnique({
    where: {
      id: id,
    },
  });
  return note;
}

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
      createdAt: true,
      updatedAt: true,
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

export async function getGroupsOfNotes(bookId: string) {
  const groupsOfNotes = await db.group.findMany({
    where: {
      bookId: bookId,
    },
    select: {
      id: true,
      title: true,
      notes: {
        select: {
          id: true,
          content: true,
          tags: true,
        },
      },
    },
  });
  return groupsOfNotes;
}

export async function getNotesByTagId(tagId: number) {
  const notes = await db.note.findMany({
    where: {
      tags: {
        some: {
          id: tagId,
        },
      },
    },
  });
  return notes;
}

export async function getGroupMarkdown(groupId: number) {
  try {
    const group = await db.group.findUnique({
      where: {
        id: groupId,
      },
      select: {
        notes: {
          select: {
            content: true,
          },
        },
      },
    });
    return { success: group?.notes.map((note) => note.content).join("\n\n") };
  } catch (error) {
    return { error: "Bir hata oluştu." };
  }
}
