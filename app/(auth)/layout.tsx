import { Header } from "@/components/header";

export default function DashLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full items-center justify-center px-4 pt-32">
      <Header user={null} />
      {children}
    </div>
  );
}
