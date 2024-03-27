import { getSession } from "@/lib/auth";
import { UserButton } from "./auth/user-button";
import { ThemeToggle } from "./switch-theme";

export const Header = async () => {
  const { user } = await getSession();
  return (
    <header className="absolute right-2 top-4 z-10 flex items-center gap-2 md:right-8">
      <ThemeToggle />
      <UserButton user={user} />
    </header>
  );
};
