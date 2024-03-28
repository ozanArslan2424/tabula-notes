import { LinkButton } from "@/components/ui/link-button";

export default function NotFound() {
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
        <LinkButton className="w-full border-secondary" variant="outline" href="/dash">
          &#x2190; Kütüphaneye dön
        </LinkButton>
      </pre>
    </div>
  );
}
