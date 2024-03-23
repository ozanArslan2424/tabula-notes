import { LinkButton } from "@/components/ui/link-button";

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
      <pre className="max-w-96 hyphens-auto text-wrap break-words rounded-sm bg-black px-8 py-4 text-gray-300">
        <span className="text-4xl font-bold text-foreground">404</span>
        <br />
        Nereye gitmeye çalışıyordun bilmiyorum ama böyle bir sayfa yok.
        <br />
        <br />
        <LinkButton className="w-full border-white" variant="outline" href="/dash">
          &#x2190; Kütüphaneye dön
        </LinkButton>
      </pre>
    </div>
  );
}
