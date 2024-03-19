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
import { Logout } from "@/lib/actions/logout";
import { useCurrentUser } from "@/lib/hooks/use-current-user";
import { HomeIcon, LogOutIcon, Settings2Icon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LoadingIcon } from "../ui/custom-loading";
import { LinkButton } from "../ui/link-button";

export const UserButton = () => {
  const [mounted, setMounted] = useState(false);
  const user = useCurrentUser();

  useEffect(() => setMounted(true), [user]);

  const handleLogout = async () => {
    await Logout();
  };

  if (!mounted)
    return (
      <Button variant="outline" size="icon" disabled>
        <LoadingIcon />
      </Button>
    );

  if (mounted && !user) {
    return <LoginButton />;
  }

  if (mounted && user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="h-9 w-9 cursor-pointer rounded-md border border-input p-0.5 shadow-sm">
            <AvatarImage className="rounded-md" src={user?.image!} />
            <AvatarFallback className="rounded-md">
              {user?.name ? user?.name[0] : user.email}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            <div>
              <p className="text-base">{user?.name}</p>
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
          <DropdownMenuItem onClick={handleLogout}>
            <LogOutIcon size={14} className="mr-2 text-red-400" /> Çıkış Yap
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
};

export const LoginButton = () => {
  const user = useCurrentUser();
  if (user)
    return (
      <LinkButton href="/dash" type="submit">
        Kütüphaneye git
      </LinkButton>
    );

  return (
    <LinkButton href="/login" type="submit">
      Giriş Yap
    </LinkButton>
  );
};

export const LogoutButton = () => {
  return (
    <form action={Logout}>
      <Button type="submit" variant="outline" size="sm" className="w-full">
        <LogOutIcon size={16} className="mr-2 text-red-400" /> Çıkış Yap
      </Button>
    </form>
  );
};
