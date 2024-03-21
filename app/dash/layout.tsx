export default function DashLayout({ children }: { children: React.ReactNode }) {
  return <div className="flex h-full min-h-[100dvh] w-full gap-4">{children}</div>;
}
