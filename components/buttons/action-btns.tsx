"use client";
import { Button } from "@/components/ui/button";
import { TooltipSet } from "@/components/ui/tooltip";
import { HomeIcon, Settings2Icon, UserCircleIcon, XCircleIcon } from "lucide-react";
import { LinkButton } from "./link-button";

export const HomeLink = () => {
  return (
    <LinkButton
      className="h-7 bg-background text-foreground"
      size="sm"
      variant="outline"
      href="/dash"
    >
      <HomeIcon className="mr-2" size={14} />
      Kütüphane
    </LinkButton>
  );
};

export const SettingsLink = () => {
  return (
    <LinkButton
      className="h-7 bg-background text-foreground"
      size="sm"
      variant="outline"
      href="/settings"
    >
      <Settings2Icon className="mr-2" size={14} />
      Hesap Ayarları
    </LinkButton>
  );
};

export const ProfileLink = () => {
  return (
    <LinkButton
      className="h-7 bg-background text-foreground"
      size="sm"
      variant="outline"
      href="/profile"
    >
      <UserCircleIcon className="mr-2" size={14} />
      Profil
    </LinkButton>
  );
};

export const CancelButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <TooltipSet text="Vazgeç">
      <Button size="sm_icon" variant="custom_destructive" onClick={onClick}>
        <XCircleIcon size={14} />
      </Button>
    </TooltipSet>
  );
};
