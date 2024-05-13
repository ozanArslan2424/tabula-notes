"use client";
import { useMediaQuery } from "@/lib/hooks/use-media";
import { UserType } from "@/lib/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserButton from "./auth/user-button";
import ThemeToggle from "./switch-theme";

export const Header = ({ user }: { user: UserType }) => {
  const pathname = usePathname();
  let regex = /\/dash\/[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}/i;
  const test = regex.test(pathname);

  const isLargeScreen = useMediaQuery("(min-width: 768px)");

  if (test && !isLargeScreen) return null;

  if (test && isLargeScreen || !test) return (
    <header className="flex h-12 items-center justify-between border-b border-primary/10 bg-accent/50 px-4 text-accent-foreground md:px-6">
      <Link href={user ? "/login" : "/dash"} className="text-xl font-bold">
        Tabula
      </Link>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <UserButton user={user} />
      </div>
    </header>
  );
};
