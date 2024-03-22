import { LinkButton } from "@/components/ui/link-button";

export default async function LandingPage() {
  return (
    <main className="relative w-full px-2 py-16 md:px-4">
      <div className="absolute left-4 top-4 w-max">
        <LinkButton href="/dash">Kütüphane</LinkButton>
      </div>
      <div className="prose prose-sm mx-auto hyphens-auto text-wrap break-words dark:prose-invert sm:prose-base lg:prose-lg sm:w-max">
        <h1>Tabula Notlar</h1>
        <p>
          Basit ve markdown uyumlu not alma web uygulaması. Temel amacı, genellikle dijital not alma uygulamalarında
          bulunmayan sütunlardan faydalanarak daha doğal bir not alma deneyimi sağlamaktır. Gerçek hayatta &quot;yana
          doğru devam eden&quot; defterleri kullansak da, dijital not alma uygulamaları genelde yalnızca aşağıya doğru
          devam ediyor. Bu nedenle, uygulamadaki sütunlar defter sayfaları benzeri bir deneyim sunar.
        </p>
        <h2>Talimatlar:</h2>
        <ol>
          <li>Bir hesap oluşturun.</li>
          <li>Üst kategoriler için kitaplar oluşturun. (İsteğe bağlı olarak yapılacaklarla birlikte.) </li>
          <li> Alt kategoriler için kitapların içine gruplar oluşturun. </li>
          <li> Son olarak, her grup altında notlarınızı yazmaya başlayın.</li>
        </ol>
        <h2>Özellikler:</h2>
        <ul>
          <li>Kimlik doğrulaması.</li>
          <li>Arama ile kitaplarınızın bir listesini içeren Kütüphane sayfası.</li>
          <li>Kitaplar üst kategoriler olarak, gruplar alt kategoriler olarak.</li>
          <li>Kitaplar için isteğe bağlı açıklamalar.</li>
          <li>Her kitap için isteğe bağlı görev listeleri (basit yapılacaklar listesi).</li>
          <li>Notlar için markdown olarak indirme işlevselliği.</li>
          <li>Gruplar için markdown olarak indirme işlevselliği.</li>
          <li>Kitaplar için markdown olarak indirme işlevselliği.</li>
        </ul>
        <h2>Gelecek:</h2>
        <ul>
          <li>Google ve GitHub girişleri.</li>
          <li>Kitaplar yerine notlara özel yapılacaklar listeleri.</li>
          <li>Hesap ayarları sayfası.</li>
          <li>Profil fotoğrafı özelliği</li>
          <li>USER ve ADMIN rolleri</li>
          <li>Daha iyi Markdown desteği</li>
          <li>Etiketler ve etiketlere göre filtreleme</li>
        </ul>
      </div>
    </main>
  );
}
