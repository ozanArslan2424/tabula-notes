import { UserButton } from "../auth/auth-buttons";
import { ThemeToggle } from "../buttons/switch-theme";

export const Header = () => {
  return (
    <header className="absolute right-2 top-4 flex items-center gap-2 md:right-8">
      <ThemeToggle />
      <UserButton />
    </header>
  );
};
