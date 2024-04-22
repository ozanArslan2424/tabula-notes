"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Logout } from "@/lib/actions/auth.actions";
import { UserType } from "@/lib/types";
import { HomeIcon, LogOutIcon, Settings2Icon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BugReport } from "../bug-report";
import { LoadingIcon } from "../custom-loading";
import { LinkButton } from "../link-button";

export const UserButton = ({ user }: { user: UserType }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleClick = async () => {
    await Logout();
  };

  if (!mounted)
    return (
      <Button variant="outline" size="icon" disabled>
        <LoadingIcon />
      </Button>
    );

  if (mounted && !user) {
    return <LinkButton href="/login">Giriş Yap</LinkButton>;
  }

  if (mounted && user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="h-9 w-9 cursor-pointer rounded-md border border-input bg-background p-0.5 shadow-sm">
            <AvatarImage className="rounded-md" src={user?.image!} />
            <AvatarFallback className="rounded-md">{user?.username ? user?.username[0] : user.email}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            <div>
              <p className="text-base">{user?.username}</p>
              <p className="text-xs font-normal text-muted-foreground">{user?.email}</p>
            </div>
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
          <DropdownMenuItem className="group" onClick={handleClick}>
            <LogOutIcon size={14} className="mr-2 group-hover:text-destructive" /> Çıkış Yap
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <BugReport menuItem userId={user.id} />
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
};
