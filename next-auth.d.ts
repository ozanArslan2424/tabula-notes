import { UserRole } from "@prisma/client";
import "next-auth";
import type { DefaultSession } from "next-auth";
import type { AdapterUser } from "./adapters.js";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      role: UserRole;
    };
  }
}

declare module "next-auth" {
  interface User extends AdapterUser {
    id: string;
    role: UserRole;
  }
}
