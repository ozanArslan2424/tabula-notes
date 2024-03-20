"use client";
import { VerifyEmail } from "@/lib/actions/verify-email";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export const VerifyForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;
    if (!token) {
      setError("Doğrulama kodu bulunamadı.");
      return;
    }

    VerifyEmail(token)
      .then((data) => {
        if (data.error) {
          setError(data.error);
        }
        if (data.success) {
          setSuccess(data.success);
        }
      })
      .catch(() => {
        setError("Bir hata oluştu.");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <p>
      {!success && !error && "Doğrulanıyor..."}
      {success && "E-posta doğrulandı."}
      {error && error}
    </p>
  );
};
