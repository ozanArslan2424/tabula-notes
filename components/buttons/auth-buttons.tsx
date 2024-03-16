"use client";
import { logoutAction } from "@/actions/auth-actions";
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
import { useCurrentUser } from "@/hooks/use-current-user";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LogOutIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { LoadingIcon } from "../custom-loading";
import { LinkButton } from "./link-button";

export const SocialButtons = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex w-full items-center space-x-2">
      <Button size="lg" variant="outline" className="w-full space-x-2" onClick={() => onClick("google")}>
        <FcGoogle className="h-6 w-6" />
      </Button>
      <Button size="lg" variant="outline" className="w-full space-x-2" onClick={() => onClick("github")}>
        <FaGithub className="h-6 w-6" />
      </Button>
    </div>
  );
};

export const LogoutButton = ({ children }: { children?: React.ReactNode }) => {
  const onClick = () => {
    logoutAction();
  };

  return (
    <span className="cursor-pointer" onClick={onClick}>
      {children}
    </span>
  );
};

export const UserButton = () => {
  const [mounted, setMounted] = useState(false);
  const user = useCurrentUser();
  useEffect(() => setMounted(true), [user]);

  if (!mounted)
    return (
      <Button variant="outline" size="icon" disabled>
        <LoadingIcon />
      </Button>
    );

  if (mounted && !user) {
    return (
      <LinkButton size="sm" href="/login">
        Giriş Yap
      </LinkButton>
    );
  }

  if (mounted && user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="h-9 w-9 cursor-pointer rounded-md border border-input p-0.5 shadow-sm">
            <AvatarImage className="rounded-md" src={user?.image!} />
            <AvatarFallback className="rounded-md">{user?.name![0]}</AvatarFallback>
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

          <Link href={`/profile`}>
            <DropdownMenuItem>Profil</DropdownMenuItem>
          </Link>
          <Link href={`/settings`}>
            <DropdownMenuItem>Ayarlar</DropdownMenuItem>
          </Link>
          <LogoutButton>
            <DropdownMenuItem>
              <LogOutIcon size={16} className="mr-2 text-red-400" /> Çıkış Yap
            </DropdownMenuItem>
          </LogoutButton>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
};
