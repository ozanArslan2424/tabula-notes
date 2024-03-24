import { Logout } from "@/lib/actions/auth.actions";
import { Button } from "../ui/button";

export const LogoutButton = () => {
  return (
    <form action={Logout}>
      <Button size="sm" variant="destructive" type="submit">
        Çıkış Yap
      </Button>
    </form>
  );
};
