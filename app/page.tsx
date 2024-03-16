import { getCurrentUser } from "@/actions/auth-read";
import { redirect } from "next/navigation";

export default async function LandingPage() {
  const user = await getCurrentUser();
  if (user) redirect("/dash");
  return (
    <>
      <p>Hello, World!</p>
      <p>Landing Page</p>
    </>
  );
}
