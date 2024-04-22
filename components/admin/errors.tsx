import { TriangleAlert } from "lucide-react";
import { LinkButton } from "../link-button";

export const AccessDenied = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-8">
      <div className="flex flex-col items-center rounded-md bg-destructive p-8 text-destructive-foreground">
        <TriangleAlert size={64} />
        <p className="mt-12 text-2xl font-bold">Admin sayfasına erişiminiz yok!</p>
      </div>
      <LinkButton
        className="w-max border-primary bg-transparent text-secondary-foreground"
        variant="outline"
        href="/dash"
      >
        &#x2190; Kütüphaneye dön
      </LinkButton>
    </div>
  );
};

export const NotFound = () => {
  return (
    <div className="grainy flex h-screen w-full flex-col items-center justify-center gap-4">
      <pre className="max-w-96 hyphens-auto text-wrap break-words rounded-sm bg-secondary px-8 py-4 text-secondary-foreground/70">
        <span className="text-4xl font-bold text-secondary-foreground">404</span>
        <br />
        Nereye gitmeye çalışıyordun bilmiyorum ama böyle bir sayfa yok.
        <br />
        <br />
        <LinkButton
          className="w-full border-primary bg-transparent text-secondary-foreground"
          variant="outline"
          href="/dash"
        >
          &#x2190; Kütüphaneye dön
        </LinkButton>
      </pre>
    </div>
  );
};

export const BookNotFound = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <pre className="max-w-96 text-wrap break-words rounded-sm bg-primary px-8 py-4 text-muted-foreground">
        <span className="text-4xl font-bold text-foreground">404</span>
        <br />
        Aranan kitap bulunamadı.
        <br />
        <br />
        <ul className="list-disc">
          <li key={1}>Bu kitabı silmiş olabilirsiniz.</li>
          <li key={2}>Kitap hiç oluşturulmamış olabilir.</li>
          <li key={3}>Kitap başka hesaba ait olabilir.</li>
        </ul>
        <br />
        <LinkButton className="w-full border-primary" variant="outline" href="/dash">
          &#x2190; Kütüphaneye dön
        </LinkButton>
      </pre>
    </div>
  );
};
