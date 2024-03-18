import Link from "next/link";

export const Nav = ({ children }: { children: React.ReactNode }) => {
  return (
    <nav className="w-min bg-accent px-2 py-4 sm:w-[332px] sm:px-4">
      <Link href="/">
        <h1 className="mb-8 hidden text-2xl font-semibold tracking-tight sm:block">Tabula Notes</h1>
      </Link>
      {children}
    </nav>
  );
};
