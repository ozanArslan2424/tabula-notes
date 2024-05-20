import { InviteRequestForm } from "@/components/auth/invite-request-form";
import { LinkButton } from "@/components/link-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="p-8">
      <Link href="https://tabulanotes.vercel.app"><span className="text-2xl my-4">YENİ ADRESE GİT: <code>https://tabulanotes.vercel.app</code></span></Link>
      <div className="prose mx-auto my-8 text-center dark:prose-invert">
        <h1>Tabula Notlar</h1>
      </div>
      <div className="mx-auto flex w-full flex-col justify-center gap-8 sm:w-max">
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Tabula Hakkında</CardTitle>
            <CardDescription>Kısa bir açıklama.</CardDescription>
          </CardHeader>
          <CardContent className="prose dark:prose-invert">
            <p>
              Basit ve markdown uyumlu not alma web uygulaması. Temel amacı, genellikle dijital not alma uygulamalarında
              bulunmayan sütunlardan faydalanarak daha doğal bir not alma deneyimi sağlamaktır. Gerçek hayatta
              &quot;yana doğru devam eden&quot; defterleri kullansak da, dijital not alma uygulamaları genelde yalnızca
              aşağıya doğru devam ediyor. Bu nedenle, uygulamadaki sütunlar defter sayfaları benzeri bir deneyim sunar.
            </p>
          </CardContent>
        </Card>

        <InviteRequestForm />

        <div className="flex flex-col gap-4 px-4 md:flex-row">
          <LinkButton
            target="_blank"
            href="https://ozanarslan.vercel.app"
            size="lg"
            variant="outline"
            className="w-full border-2 bg-transparent"
          >
            Portföyüme göz atın.
          </LinkButton>

          <LinkButton href="/login" size="lg" className="w-full">
            Hemen Başlayın
          </LinkButton>
        </div>
      </div>
    </main>
  );
}
