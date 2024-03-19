import { LoginForm } from "@/components/auth/login-form";
import { getCurrentUser } from "@/lib/actions/user";
import { redirect } from "next/navigation";

type Props = {};

export default async function LoginPage(props: Props) {
  const user = await getCurrentUser();
  if (user) redirect("/dash");
  return (
    <div className="mx-auto w-max">
      <LoginForm />
    </div>
  );
}
