"use client";
import { RegisterForm } from "@/components/auth/register-form";
import { ErrorMessage, SuccessMessage, WaitingMessage } from "@/components/errors";
import { LinkButton } from "@/components/link-button";
import { verifyInvite } from "@/lib/actions/auth.actions";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function VerifyPage() {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onVerify = useCallback(() => {
    if (success || error) return;
    if (!token) {
      setError("Doğrulama kodu bulunamadı.");
      return;
    }

    verifyInvite(token)
      .then((data) => {
        if (data.error) {
          setError(data.error);
        }
        if (data.success) {
          setSuccess(data.success);
          setEmail(data.email);
        }
      })
      .catch(() => {
        setError("Bir hata oluştu.");
      });
  }, [token, success, error]);

  useEffect(() => {
    onVerify();
  }, [onVerify]);

  return (
    <>
      {!success && !error && <WaitingMessage>Doğrulanıyor...</WaitingMessage>}
      {success && <SuccessMessage>E-posta doğrulandı.</SuccessMessage>}
      {success && email && <RegisterForm email={email} />}
      {error && (
        <>
          <ErrorMessage>{error}</ErrorMessage>
          <LinkButton className="w-full border-primary" variant="outline" href="/">
            &#x2190; Ana sayfaya dön
          </LinkButton>
        </>
      )}
    </>
  );
}
