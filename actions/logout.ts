"use server";

import { signOut } from "@/auth";

export async function Logout() {
  await signOut();
}
