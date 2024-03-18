export default function DashLayout({ children }: { children: React.ReactNode }) {
  return <div className="flex h-full min-h-screen gap-4">{children}</div>;
}
