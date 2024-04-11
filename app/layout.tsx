import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { getSession } from "@/lib/auth";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tabula Notlar",
  description: "Tabula Notlar, daha organik bir deneyim sunma amacıyla oluşturulmuş bir not alma uygulamasıdır.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await getSession();
  return (
    <html suppressHydrationWarning lang="tr">
      <body className={montserrat.className}>
        <ThemeProvider attribute="class">
          <Header user={user} />
          {children}
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
