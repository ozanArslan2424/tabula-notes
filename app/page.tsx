import { LinkButton } from "@/components/ui/link-button";

export default async function LandingPage() {
  return (
    <main className="relative w-full px-2 py-16 md:px-4">
      <div className="absolute left-4 top-4">
        <LinkButton href="/dash">Kütüphane</LinkButton>
      </div>
      <div className="prose mx-auto w-max dark:prose-invert">
        <h1>Tabula Notlar</h1>
        <p>
          Basit ve markdown uyumlu not alma web uygulaması. Temel amacı, genellikle dijital not alma
          uygulamalarında bulunmayan sütunlardan faydalanarak daha doğal bir not alma deneyimi
          sağlamaktır. Gerçek hayatta &quot;yana doğru devam eden&quot; defterleri kullansak da,
          dijital not alma uygulamaları genelde yalnızca aşağıya doğru devam ediyor. Bu nedenle,
          uygulamadaki sütunlar defter sayfaları benzeri bir deneyim sunar.
        </p>
        <h2>Talimatlar:</h2>
        <ol className="list-decimal">
          <li>
            Sihirli bağlantı veya Google/Github OAuth hizmetlerini kullanarak bir hesap oluşturun.
          </li>
          <li>
            Üst düzey kategoriler için kitaplar oluşturun. &#40;İsteğe bağlı olarak görevlerle
            birlikte.&#41;
          </li>
          <li>Kitapların içine alt kategoriler için gruplar oluşturun.</li>
          <li>Son olarak, her grup altında notlarınızı yazmaya başlayın.</li>
        </ol>

        <h2>Özellikler:</h2>

        <ul>
          <li>Arama ile kitaplarınızın bir listesini içeren bir Gösterge Tablosu sayfası.</li>
          <li>Kitaplar üst düzey kategoriler olarak, gruplar alt kategoriler olarak.</li>
          <li>Her kitap için isteğe bağlı görev listeleri &#40;basit yapılacaklar listesi&#41;.</li>
          <li>Her not için markdown olarak indirme işlevselliği.</li>
          <li>
            Bir grup altındaki her not için tek bir dosya olarak markdown olarak indirme
            işlevselliği.
          </li>
          <li>ROLE ADMIN&apos;e sahip kullanıcılar için profil resimleri.</li>
        </ul>
        <h2>Gelecek:</h2>

        <ul>
          <li>Etiketler ve etiketlere göre filtreleme özellikleri.</li>
          <li>ROLE USER&apos;ya sahip kullanıcılar için profil resimleri.</li>
          <li>Düzenleme için daha iyi markdown desteği.</li>
        </ul>
      </div>
    </main>
  );
}
