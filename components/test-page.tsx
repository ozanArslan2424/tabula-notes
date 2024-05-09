import { AccessDenied } from "@/components/errors";
import { getSession } from "@/lib/auth";

export default async function AdminTestPage() {
  const { user } = await getSession();
  if (user && user.role !== "ADMIN") {
    return <AccessDenied />;
  }

  if (user && user.role === "ADMIN") {
    return (
      <div className="flex h-screen w-full flex-col">
        <h1 className="text-4xl font-bold text-secondary-foreground">Test</h1>
      </div>
    );
  }
}
