import { RegisterForm } from "@/components/auth/register-form";
import { getCurrentUser } from "@/lib/actions/user";
import { redirect } from "next/navigation";

type Props = {};

export default async function RegisterPage(props: Props) {
  const user = await getCurrentUser();
  if (user) redirect("/dash");
  return (
    <div className="mx-auto w-max">
      <RegisterForm />
    </div>
  );
}
