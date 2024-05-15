import { InviteRequestForm } from "@/components/auth/invite-request-form";
import { LoginForm } from "@/components/auth/login-form";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const { user } = await getSession();

  if (user) redirect("/dash");

  return (
    <>
      <h1 className="mb-4 text-center text-3xl font-bold">Giriş Yap</h1>
      <LoginForm />
      <div className="my-4 flex items-center gap-2">
        <div className="h-0.5 w-full bg-accent"></div>
        <p className="text-primary">veya</p>
        <div className="h-0.5 w-full bg-accent"></div>
      </div>
      <InviteRequestForm />
    </>
  );
}
