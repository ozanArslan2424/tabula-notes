import { SettingsForm } from "@/components/auth/auth-forms";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function SettingsPage() {
  return (
    <div className="grainy h-full w-full">
      <Card className="mx-auto w-full max-w-2xl p-5">
        <CardHeader>
          <CardTitle>Ayarlar</CardTitle>
          <CardDescription>
            Hesap ayarlarını değiştirdikten sonra kaydetmeyi unutma.
          </CardDescription>
        </CardHeader>
        <SettingsForm />
      </Card>
    </div>
  );
}
