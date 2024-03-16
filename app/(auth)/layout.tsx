import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-[calc(100vh-80px)] flex-col items-center justify-center">
      <Link href="/">
        <h1 className="m-0 mb-4 text-nowrap text-3xl font-semibold hover:font-bold">
          Charted Notes
        </h1>
      </Link>
      <main>{children}</main>
    </div>
  );
}
