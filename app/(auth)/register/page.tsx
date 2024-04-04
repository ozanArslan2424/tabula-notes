import { RegisterForm } from "@/components/auth/register-form";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
  const { user } = await getSession();

  if (user) {
    redirect("/dash");
  }
  return (
    <div className="mx-auto w-max">
      <RegisterForm />
    </div>
  );
}
