"use client";
import useLargeScreen from "@/lib/hooks/use-screen";
import { ChevronLeftIcon, MenuIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";

export const Nav = ({ children }: { children: React.ReactNode }) => {
  const { isLargeScreen } = useLargeScreen();
  const [open, setOpen] = useState(isLargeScreen ? true : false);

  if (open) {
    return (
      <nav className="absolute left-0 top-0 z-20 flex h-[100dvh] w-screen flex-col justify-between bg-accent p-4 sm:w-[280px] md:static">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <Link className="mb-4" href="/">
              <h1 className="text-nowrap text-2xl font-semibold tracking-tight">Tabula Notlar</h1>
            </Link>

            <Button
              size="sm"
              variant="outline"
              className="w-8 bg-background text-foreground"
              onClick={() => setOpen(false)}
            >
              <ChevronLeftIcon size={14} className="shrink-0" />
            </Button>
          </div>
          {children}
        </div>
        <div className="flex items-center justify-between text-xs">
          <Link className="text-muted-foreground hover:text-accent-foreground" href="https://github.com/ozanArslan2424">
            Ozan Arslan
          </Link>
          <p className="text-muted-foreground">2024</p>
        </div>
      </nav>
    );
  }
  if (!open || !isLargeScreen) {
    return (
      <nav className="p-4">
        <Button
          size="sm"
          variant="outline"
          className="w-8 bg-accent text-accent-foreground"
          onClick={() => setOpen(true)}
        >
          <MenuIcon size={14} className="shrink-0" />
        </Button>
      </nav>
    );
  }
};
