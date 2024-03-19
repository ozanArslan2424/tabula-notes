import { SettingsForm } from "@/components/auth/settings-form";
import { getCurrentUser } from "@/lib/actions/user";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return (
    <div className="mx-auto w-max">
      <SettingsForm />
    </div>
  );
}
