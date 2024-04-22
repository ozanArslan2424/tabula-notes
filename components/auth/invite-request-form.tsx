"use client";
import { sendRequested } from "@/lib/actions/mail.actions";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export const InviteRequestForm = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const [reqMail, setReqMail] = useState<string>("");

  const handleRegisterRequest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await sendRequested(reqMail).then(() => setSuccess(true));
  };

  return success ? (
    <div className="w-full rounded-md bg-emerald-500 px-3 py-2 text-center">
      <p className="text-white">Davet isteğin alındı. :&#41;</p>
    </div>
  ) : (
    <form onSubmit={handleRegisterRequest} className="space-y-2 px-4">
      <Label htmlFor="new_email">Kaydolmak mı istiyorsun?</Label>
      <div className="flex items-center gap-4">
        <Input
          disabled={success}
          id="new_email"
          name="new_email"
          type="email"
          required
          placeholder="E-Posta Adresi"
          value={reqMail}
          onChange={(e) => setReqMail(e.target.value)}
        />
        <Button variant="custom_submit" type="submit" disabled={success}>
          Davet Kodu İste
        </Button>
      </div>
    </form>
  );
};
