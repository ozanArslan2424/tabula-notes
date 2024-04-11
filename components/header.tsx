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
    <header className="absolute right-4 top-4 flex items-center gap-2">
      <ThemeToggle />
      <UserButton user={user} />
    </header>
  );
};
