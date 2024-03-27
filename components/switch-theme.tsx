"use client";
import { Button } from "@/components/ui/button";
import { LoadingIcon } from "@/components/ui/custom-loading";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted)
    return (
      <Button variant="outline" size="icon" disabled className="bg-background">
        <LoadingIcon />
      </Button>
    );

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
      className="bg-background"
    >
      {resolvedTheme === "light" ? <MoonIcon size={14} /> : <SunIcon size={14} />}
    </Button>
  );
};
