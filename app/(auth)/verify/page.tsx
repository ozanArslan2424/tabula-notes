"use client";
import { VerifyEmail } from "@/lib/actions/auth.actions";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function VerifyPage() {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onVerify = useCallback(() => {
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
    onVerify();
  }, [onVerify]);

  return (
    <div className="text-center">
      <p>
        {!success && !error && "Doğrulanıyor..."}
        {success && "E-posta doğrulandı."}
        {error && error}
      </p>
      {success && (
        <p>
          Giriş yapmak için <Link href="/login">buraya tıklayın.</Link>
        </p>
      )}
    </div>
  );
}
