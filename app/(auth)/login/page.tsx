import { LoginForm } from "@/components/auth/login-form";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const { user } = await getSession();

  if (user) {
    redirect("/dash");
  }
  return (
    <div className="mx-auto mt-32 w-max">
      <LoginForm />
    </div>
  );
}
