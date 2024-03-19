"use client";
import { LoginButton } from "@/components/auth/auth-buttons";
import { LoadingIcon } from "@/components/ui/custom-loading";
import { newVerificationAction } from "@/lib/actions/user";
import { CheckIcon, XIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function NewVerificationForm() {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const { update } = useSession();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;
    if (!token) {
      setError("Doğrulama kodu bulunamadı.");
      return;
    }

    newVerificationAction(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
        update();
      })
      .catch(() => {
        setError("Bir hata oluştu.");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div className="my-6 flex w-full items-center justify-center">
      {!success && !error && (
        <div className="flex flex-col items-center gap-8">
          <h1 className="text-2xl font-bold">E-posta doğrulanıyor...</h1>
          <LoadingIcon />
        </div>
      )}
      {success && (
        <div className="flex flex-col items-center gap-8">
          <h1 className="text-2xl font-bold">E-posta başarıyla doğrulandı</h1>
          <div className="flex items-center justify-center rounded-md border bg-card p-2 shadow">
            <CheckIcon size={32} className="text-emerald-500" />
          </div>
          <LoginButton />
        </div>
      )}
      {!success && error && (
        <div className="flex flex-col items-center gap-8">
          <h1 className="text-2xl font-bold">{error}</h1>
          <div className="flex items-center justify-center rounded-md border bg-card p-2 shadow">
            <XIcon size={32} className="text-red-500" />
          </div>
          <LoginButton />
        </div>
      )}
    </div>
  );
}
