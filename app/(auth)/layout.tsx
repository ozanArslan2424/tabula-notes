export default function DashLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[calc(100dvh-48px)] h-full w-full items-center justify-center">
      <div className="max-w-96">{children}</div>
    </div>
  );
}
