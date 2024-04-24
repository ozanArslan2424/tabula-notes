export default function DashLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="max-w-96">{children}</div>
    </div>
  );
}
