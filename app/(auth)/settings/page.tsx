import { LinkButton } from "@/components/link-button";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const { user } = await getSession();
  if (!user) redirect("/login");
  return (
    <div className="mx-auto w-max">
      <div className="rounded-md border bg-destructive p-4 text-center text-destructive-foreground shadow">
        <p className="text-lg">Bu sayfa henüz yapım aşamasında.</p>
      </div>
      {user.role === "ADMIN" && (
        <LinkButton className="mt-8 w-full border-primary" variant="custom_submit" href="/admin">
          Admin sayfasına git &#x2192;
        </LinkButton>
      )}
      <LinkButton className="mt-8 w-full border-primary" variant="outline" href="/dash">
        &#x2190; Kütüphaneye dön
      </LinkButton>
    </div>
  );
}
