import { AuthCardWrapper } from "@/components/auth/auth-card-wrapper";

export default function LoginErrorPage() {
  return (
    <AuthCardWrapper
      headerLabel="Bir hata oluştu..."
      routeLinkHref="/login"
      routeLinkLabel="Geri Dön"
      showSocialButtons={false}
    >
      <p className="mb-2 text-center">
        Bir şeyler yanlış gitti, lütfen tekrar deneyiniz.
      </p>
    </AuthCardWrapper>
  );
}
