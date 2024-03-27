import { UserButton } from "./auth/user-button";
import { ThemeToggle } from "./switch-theme";

export const Header = ({
  user,
}: {
  user: {
    id: string;
    email: string;
    username: string;
    image: string;
    role: string;
  } | null;
}) => {
  return (
    <header className="absolute right-2 top-4 z-10 flex items-center gap-2 md:right-8">
      <ThemeToggle />
      <UserButton user={user} />
    </header>
  );
};
