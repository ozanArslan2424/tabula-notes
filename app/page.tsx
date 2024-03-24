import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LinkButton } from "@/components/ui/link-button";

export default async function LandingPage() {
  return (
    <main className="w-full px-2 py-16 md:px-4">
      <div className="prose mx-auto text-center dark:prose-invert">
        <h1>Tabula Notlar</h1>
      </div>
      <div className="flex flex-col-reverse justify-center gap-8 px-2 pt-8 md:flex-row md:px-24 md:pt-16">
        <div>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Çoktan Gelmiş Özellikler</CardTitle>
              <CardDescription>Şimdiden kullanabileceğiniz özellikler.</CardDescription>
            </CardHeader>
            <CardContent className="prose dark:prose-invert">
              <ul>
                <li>Kimlik doğrulaması ve Google ve GitHub girişleri.</li>
                <li>Arama ile kitaplarınızın bir listesini içeren Kütüphane sayfası.</li>
                <li>Kitaplar üst kategoriler olarak, gruplar alt kategoriler olarak.</li>
                <li>Kitaplar için isteğe bağlı açıklamalar.</li>
                <li>Her kitap için isteğe bağlı görev listeleri (basit yapılacaklar listesi).</li>
                <li>Kitapsız, grupsuz, bağımsız hızlı notlar.</li>
                <li>Notları markdown olarak indir.</li>
                <li>Grupları markdown olarak indir.</li>
                <li>Kitapları markdown olarak indir.</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Gelecek Özellikler</CardTitle>
              <CardDescription>Gelebilir de gelmeyebilir de...</CardDescription>
            </CardHeader>
            <CardContent className="prose dark:prose-invert">
              <ul>
                <li>Kitaplar yerine notlara özel yapılacaklar listeleri.</li>
                <li>Hesap ayarları sayfası.</li>
                <li>Profil fotoğrafı özelliği</li>
                <li>USER ve ADMIN rolleri</li>
                <li>Daha iyi Markdown desteği</li>
                <li>Etiketler ve etiketlere göre filtreleme</li>
                <li>Notlar arası ilişkiler.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Tabula Hakkında</CardTitle>
              <CardDescription>Kısa bir açıklama.</CardDescription>
            </CardHeader>
            <CardContent className="prose dark:prose-invert">
              <p>
                Basit ve markdown uyumlu not alma web uygulaması. Temel amacı, genellikle dijital not alma
                uygulamalarında bulunmayan sütunlardan faydalanarak daha doğal bir not alma deneyimi sağlamaktır. Gerçek
                hayatta &quot;yana doğru devam eden&quot; defterleri kullansak da, dijital not alma uygulamaları genelde
                yalnızca aşağıya doğru devam ediyor. Bu nedenle, uygulamadaki sütunlar defter sayfaları benzeri bir
                deneyim sunar.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Kullanım Kılavuzu</CardTitle>
              <CardDescription>Buradan başlayın.</CardDescription>
            </CardHeader>
            <CardContent className="prose dark:prose-invert">
              <ol>
                <li>Öncelikle e-posta adresi, Google hesabı veya GitHub hesabınızı kullanarak bir hesap oluşturun.</li>
                <li>
                  Kütüphane sayfasında notlarınız için üst kategori niteliğinde &quot;kitaplar&quot; oluşturmanız
                  gerekiyor.
                </li>
                <li>İsterseniz kitabınıza yapılacaklar listesi de ekleyebilirsiniz.</li>
                <li>Kitapların içinde alt kategori niteliğinde gruplar oluşturmanız gerekiyor.</li>
                <li>Her grup başlığının altında ilgili notlarınızı yazmaya başlayabilirsiniz.</li>
              </ol>
            </CardContent>
          </Card>
          <div className="flex flex-col gap-4 px-4 md:flex-row">
            <LinkButton
              target="_blank"
              href="https://github.com/ozanArslan2424"
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
      </div>
    </main>
  );
}
