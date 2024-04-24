"use client";
import { createNewUser } from "@/lib/actions/admin.actions";
import { sendEmail } from "@/lib/actions/mail.actions";
import { MailIcon } from "lucide-react";
import { useState, useTransition } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export const InviteForm = () => {
  const [isPending, startTransition] = useTransition();
  const [mail, setMail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const handleInvite = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startTransition(async () => {
      await createNewUser(mail).then((data) => {
        if (data.error) {
          setError(data.error);
        }
        if (data.token) {
          sendEmail({
            type: "invite",
            email: mail,
            token: data.token.token,
          });
          setSuccess(true);
        }
      });
    });
  };

  return (
    <form onSubmit={handleInvite} className="space-y-4">
      <Input
        id="email"
        name="email"
        type="email"
        placeholder="Email"
        autoComplete="off"
        onChange={(e) => setMail(e.target.value)}
      />
      <Button disabled={!mail} className="w-full" type="submit">
        <MailIcon size={16} className="mr-2" />
        Davet Gönder
      </Button>
      <div>
        {isPending && !success && !error && <p className="text-center">Davet gönderiliyor...</p>}
        {!isPending && success && !error && <p className="text-center text-emerald-500">Davet gönderildi.</p>}
        {!isPending && !success && error && <p className="text-center text-red-500">{error}</p>}
      </div>
    </form>
  );
};
