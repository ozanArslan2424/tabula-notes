import { Header } from "@/components/layout/header";
import { CurrentSessionProvider } from "@/components/providers/session-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import { Toaster } from "sonner";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tabula Notes",
  description:
    "Tabula Notes, daha organik bir deneyim sunma amacıyla oluşturulmuş bir not alma uygulamasıdır.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="tr">
      <CurrentSessionProvider>
        <body className={montserrat.className}>
          <ThemeProvider attribute="class">
            <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
            <Header />
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </CurrentSessionProvider>
    </html>
  );
}
