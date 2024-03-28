import { LinkButton } from "@/components/ui/link-button";

export default function NotFound() {
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
}
