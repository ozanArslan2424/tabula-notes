import Link from "next/link";
import { UserButton } from "../auth/auth-buttons";
import { ThemeToggle } from "../buttons/switch-theme";

export const Header = () => {
  return (
    <header className="flex h-12 items-center justify-between bg-accent/50 px-4 md:px-6">
      <Link href="/">
        <h1 className="text-xl font-semibold capitalize">Tabula Notes</h1>
      </Link>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <UserButton />
      </div>
    </header>
  );
};
