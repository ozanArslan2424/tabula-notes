"use client";
import { SocialButtons } from "@/components/buttons/auth-buttons";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

type AuthCardWrapperProps = {
  children: React.ReactNode;
  headerLabel: string;
  routeLinkLabel: string;
  routeLinkHref: string;
  showSocialButtons?: boolean;
};

export const AuthCardWrapper = ({
  children,
  headerLabel,
  routeLinkLabel,
  routeLinkHref,
  showSocialButtons = true,
}: AuthCardWrapperProps) => {
  return (
    <Card className="min-w-96 rounded-xl p-6">
      <CardHeader>
        <CardTitle>{headerLabel}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocialButtons && (
        <CardFooter>
          <SocialButtons />
        </CardFooter>
      )}
      <CardFooter>
        <Link className="w-full text-sm font-bold hover:underline" href={routeLinkHref}>
          {routeLinkLabel}
        </Link>
      </CardFooter>
    </Card>
  );
};
