import { VerifyForm } from "@/components/auth/verify-form";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function VerifyPage() {
  const { user } = await getSession();

  if (user) {
    redirect("/dash");
  }
  return (
    <div className="w-max mx-auto mt-32">
      <VerifyForm />
    </div>
  );
}
