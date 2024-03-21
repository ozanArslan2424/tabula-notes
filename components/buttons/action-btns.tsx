"use client";
import { HomeIcon, Settings2Icon, Trash2Icon, UserCircleIcon } from "lucide-react";
import { Button } from "../ui/button";
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

export const OrganizeBooksButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button
      size="sm"
      variant="outline"
      className="w-full justify-start space-x-3 bg-background text-foreground"
      onClick={onClick}
    >
      <Trash2Icon size={14} className="shrink-0" />
      <span>Kitapları düzenle</span>
    </Button>
  );
};
