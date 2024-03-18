"use client";
import { HomeIcon, Settings2Icon, UserCircleIcon } from "lucide-react";
import { LinkButton } from "../ui/link-button";

export const HomeLink = () => {
  return (
    <LinkButton
      className="h-7 space-x-2 bg-background text-foreground"
      size="sm"
      variant="outline"
      href="/dash"
    >
      <HomeIcon size={14} />
      <span className="sr-only sm:not-sr-only">Kütüphane</span>
    </LinkButton>
  );
};

export const SettingsLink = () => {
  return (
    <LinkButton
      className="h-7 space-x-2 bg-background text-foreground"
      size="sm"
      variant="outline"
      href="/settings"
    >
      <Settings2Icon size={14} />
      <span className="sr-only sm:not-sr-only">Hesap Ayarları</span>
    </LinkButton>
  );
};

export const ProfileLink = () => {
  return (
    <LinkButton
      className="h-7 space-x-2 bg-background text-foreground"
      size="sm"
      variant="outline"
      href="/profile"
    >
      <UserCircleIcon size={14} />
      <span className="sr-only sm:not-sr-only">Profil</span>
    </LinkButton>
  );
};
