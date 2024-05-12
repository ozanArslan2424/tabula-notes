"use client";
import { LoadingIcon } from "@/components/custom-loading";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted)
    return (
      <button disabled>
        <LoadingIcon />
      </button>
    );

  return (
    <button onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")} className="btn btn-icon">
      {resolvedTheme === "light" ? <MoonIcon size={14} /> : <SunIcon size={14} />}
    </button>
  );
}
