import { LinkButton } from "@/components/ui/link-button";
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
      <LinkButton className="mt-8 w-full border-white" variant="outline" href="/dash">
        &#x2190; Kütüphaneye dön
      </LinkButton>
    </div>
  );
}
