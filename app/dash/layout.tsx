export default function DashLayout({ children }: { children: React.ReactNode }) {
  return <div className="flex h-full min-h-screen w-full gap-4">{children}</div>;
}
