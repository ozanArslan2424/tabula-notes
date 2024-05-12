import { UserType } from "@/lib/types";
import Link from "next/link";
import UserButton from "./auth/user-button";
import ThemeToggle from "./switch-theme";

export const Header = ({ user }: { user: UserType }) => {
  return (
    <header className="hidden h-12 items-center justify-between border-b border-primary/10 bg-accent/50 px-4 text-accent-foreground md:flex md:px-6">
      <Link href={user ? "/login" : "/dash"}>
        <h1 className="text-xl font-bold">Tabula</h1>
      </Link>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <UserButton user={user} />
      </div>
    </header>
  );
};
