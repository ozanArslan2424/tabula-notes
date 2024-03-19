import { getCurrentUser } from "@/lib/actions/user";
import { redirect } from "next/navigation";
export default async function ErrorPage() {
  const user = await getCurrentUser();
  if (user) redirect("/dash");
  return <div>ErrorPage</div>;
}
