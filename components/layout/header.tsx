import { UserButton } from "@/components/buttons/auth-buttons";
import { ThemeToggle } from "../buttons/switch-theme";

export const Header = () => {
  return (
    <header className="flex h-12 items-center justify-between bg-accent/70 px-4 md:px-6">
      <h1 className="text-xl font-semibold capitalize">Charted Notes</h1>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <UserButton />
      </div>
    </header>
  );
};
