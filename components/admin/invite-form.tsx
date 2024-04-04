"use client";
import { sendToken } from "@/lib/actions/mail.actions";
import { generateId } from "lucia";
import { MailIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export const InviteForm = () => {
  const [mail, setMail] = useState("");
  const [success, setSuccess] = useState(false);

  const handleInvite = () => {
    const randomToken = generateId(15);
    sendToken(randomToken, mail).then(() => {
      setSuccess(true);
    });
  };

  return (
    <div className="space-y-4">
      <Input
        id="email"
        name="email"
        placeholder="Email"
        type="email"
        autoComplete="off"
        onChange={(e) => setMail(e.target.value)}
      />
      <Button disabled={!mail} className="w-full" onClick={handleInvite}>
        <MailIcon size={16} className="mr-2" />
        Davet Gönder
      </Button>
      <div>{success && <p className="text-center text-green-500">Davet gönderildi.</p>}</div>
    </div>
  );
};
