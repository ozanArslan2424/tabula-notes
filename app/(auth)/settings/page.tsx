import { PictureForm, SettingsForm } from "@/components/auth/settings-form";
import { LinkButton } from "@/components/link-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { logout } from "@/lib/actions/auth.actions";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const { user } = await getSession();

  if (!user) redirect("/login");

  return (
    <>
      {user.role === "ADMIN" && (
        <LinkButton className="mb-8 w-full" href="/admin">
          Admin sayfasına git &#x2192;
        </LinkButton>
      )}
      <Card className="mb-4 p-4">
        <CardHeader>
          <CardTitle>Profil Resmi</CardTitle>
        </CardHeader>
        <CardContent>
          <PictureForm user={user} />
        </CardContent>
      </Card>
      <Card className="p-4">
        <CardHeader>
          <CardTitle>Ayarlar</CardTitle>
          <CardDescription>Hesap ayarlarınızı buradan düzenleyebilirsiniz.</CardDescription>
        </CardHeader>
        <CardContent>
          <SettingsForm user={user} />
        </CardContent>
      </Card>

      <LinkButton className="mt-8 w-full border-primary" variant="outline" href="/dash">
        &#x2190; Kütüphaneye dön
      </LinkButton>

      <form action={logout}>
        <Button className="mt-4 w-full" variant="custom_destructive" type="submit">
          Çıkış yap
        </Button>
      </form>
    </>
  );
}
