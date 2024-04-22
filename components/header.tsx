import { UserType } from "@/lib/types";
import { UserButton } from "./auth/user-button";
import { ThemeToggle } from "./switch-theme";

export const Header = ({ user }: { user: UserType }) => {
  return (
    <header className="absolute right-4 top-4 flex items-center gap-2">
      <ThemeToggle />
      <UserButton user={user} />
    </header>
  );
};
