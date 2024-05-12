"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/lib/actions/auth.actions";
import { UserType } from "@/lib/types";
import { HomeIcon, LogOutIcon, Settings2Icon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BugReport } from "../bug-report";
import { LoadingIcon } from "../custom-loading";

export default function UserButton({ user }: { user: UserType }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleLogout = async () => {
    await logout();
  };

  if (!mounted)
    return (
      <button disabled>
        <LoadingIcon />
      </button>
    );

  if (mounted && !user) {
    return (
      <Link href="/login" className="btn">
        Giriş Yap
      </Link>
    );
  }

  if (mounted && user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 rounded-md bg-primary/10 transition-colors hover:bg-primary/20">
            <Avatar>
              <AvatarImage src={user.image} alt={user.username} />
              <AvatarFallback className="px-3">{user.username}</AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            <p className="text-base">{user?.username}</p>
            <p className="text-xs font-normal text-muted-foreground">{user?.email}</p>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <Link href="/dash">
            <DropdownMenuItem>
              <HomeIcon size={14} className="mr-2" /> Kütüphane
            </DropdownMenuItem>
          </Link>

          <Link href="/settings">
            <DropdownMenuItem>
              <Settings2Icon size={14} className="mr-2" /> Ayarlar
            </DropdownMenuItem>
          </Link>

          <DropdownMenuItem className="group" onClick={handleLogout}>
            <LogOutIcon size={14} className="mr-2 group-hover:text-destructive" /> Çıkış Yap
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <BugReport menuItem userId={user.id} />
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
}
