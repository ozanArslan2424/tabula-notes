import { LinkButton } from "@/components/ui/link-button";
import { getCurrentUser } from "@/lib/actions/user";
import { MailIcon } from "lucide-react";
import { redirect } from "next/navigation";

type Props = {};

export default async function VerifyEmailPage({}: Props) {
  const user = await getCurrentUser();
  if (user) redirect("/dash");
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="mb-2 text-center text-3xl font-bold">E-Posta Gönderildi</h1>
      <p className="mb-4 text-center text-muted-foreground">
        Hesabına giriş yapabilmek için <br /> e-posta adresine gönderilmiş büyülü linke tıkla.
      </p>
      <MailIcon size={64} />
      <p className="my-4 text-center text-muted-foreground">Bir şeyleri yanlış yaptım diyorsan</p>
      <LinkButton href="/login">Tekrar Dene</LinkButton>
    </div>
  );
}
