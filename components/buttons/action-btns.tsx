"use client";
import { HomeIcon, Settings2Icon, UserCircleIcon } from "lucide-react";
import { LinkButton } from "../ui/link-button";

export const HomeLink = () => {
  return (
    <LinkButton
      className="w-full justify-start space-x-3 bg-background text-foreground"
      size="sm"
      variant="outline"
      href="/dash"
    >
      <HomeIcon size={14} className="shrink-0" />
      <span>Kütüphane</span>
    </LinkButton>
  );
};

export const SettingsLink = () => {
  return (
    <LinkButton
      className="w-full justify-start space-x-3 bg-background text-foreground"
      size="sm"
      variant="outline"
      href="/settings"
    >
      <Settings2Icon size={14} className="shrink-0" />
      <span>Hesap Ayarları</span>
    </LinkButton>
  );
};

export const ProfileLink = () => {
  return (
    <LinkButton
      className="w-full justify-start space-x-3 bg-background text-foreground"
      size="sm"
      variant="outline"
      href="/profile"
    >
      <UserCircleIcon size={14} className="shrink-0" />
      <span>Profil</span>
    </LinkButton>
  );
};
