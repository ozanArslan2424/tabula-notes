import Link from "next/link";

export const Nav = ({ children }: { children: React.ReactNode }) => {
  return (
    <nav className="flex h-[100dvh] w-min flex-col justify-between bg-accent px-2 py-4 sm:w-[332px] sm:px-4">
      <div>
        <Link href="/">
          <h1 className="mb-4 hidden text-2xl font-semibold tracking-tight sm:block">
            Tabula Notlar
          </h1>
        </Link>
        {children}
      </div>
      <div className="flex flex-col items-center justify-between text-xs sm:flex-row">
        <Link
          className="text-muted-foreground hover:text-accent-foreground"
          href="https://github.com/ozanArslan2424"
        >
          Ozan Arslan
        </Link>
        <p className="text-muted-foreground">2024</p>
      </div>
    </nav>
  );
};
