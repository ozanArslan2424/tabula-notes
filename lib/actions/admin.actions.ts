"use server";
import { generateId } from "lucia";
import { revalidatePath } from "next/cache";
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
          tasks: true,
          quicknotes: true,
          accounts: true,
          sessions: true,
        },
      },
    },
  });
  return users;
}

export async function makeAdmin(userId: string) {
  try {
    await db.user.update({
      where: { id: userId },
      data: { role: "ADMIN" },
    });
  } catch (error) {
    console.error(error);
  } finally {
    revalidatePath("/admin", "page");
  }
}

export async function removeAdmin(userId: string) {
  try {
    await db.user.update({
      where: { id: userId },
      data: { role: "USER" },
    });
  } catch (error) {
    console.error(error);
  } finally {
    revalidatePath("/admin", "page");
  }
}

export async function createNewUser(email: string) {
  const userId = generateId(15);
  const randomRegisterToken = generateId(15);
  const expires = new Date(new Date().getTime() + 3600 * 1000); // 1 hour

  const token = await db.registerToken.create({
    data: {
      email: email,
      expires: expires,
      token: randomRegisterToken,
    },
  });

  try {
    await db.user.create({
      data: {
        id: userId,
        email: email,
        registerTokens: {
          connect: {
            id: token.id,
          },
        },
      },
    });
    return { token: token };
  } catch {
    return { error: "Bir şeyler yanlış gitti. Lütfen tekrar deneyin." };
  }
}

export async function getBugs() {
  const bugs = await db.bug.findMany();
  return bugs;
}

export async function deleteBug(bugId: number) {
  try {
    await db.bug.delete({
      where: {
        id: bugId,
      },
    });
  } catch (error) {
    console.error("fail to del bug", error);
  } finally {
    revalidatePath("/admin", "page");
  }
}

export async function resolveBug(bugId: number) {
  try {
    await db.bug.update({
      where: {
        id: bugId,
      },
      data: {
        resolved: true,
      },
    });
    return { success: "Bug resolved" };
  } catch (error) {
    console.error("Failed to resolve bug:", error);
    return { error: "Bug could not be resolved." };
  } finally {
    revalidatePath("/admin", "page");
  }
}
