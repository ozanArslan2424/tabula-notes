export default function DashLayout({ children }: { children: React.ReactNode }) {
  return <div className="grainy flex h-full min-h-[calc(100dvh-48px)] w-full gap-4 px-2 py-4 md:p-4">{children}</div>;
}
