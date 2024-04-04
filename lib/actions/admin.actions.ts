"use server";

import db from "../db";

export async function getAllUserInfo() {
  const users = await db.user.findMany({
    select: {
      username: true,
      id: true,
      email: true,
      role: true,
      image: true,
      _count: {
        select: {
          books: true,
          accounts: true,
          quicknotes: true,
          sessions: true,
        },
      },
    },
  });
  return users;
}

export async function makeAdmin(userId: string) {
  await db.user.update({
    where: { id: userId },
    data: { role: "ADMIN" },
  });
}

export async function removeAdmin(userId: string) {
  await db.user.update({
    where: { id: userId },
    data: { role: "USER" },
  });
}
