import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Toaster } from "sonner";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tabula Notlar",
  description: "Tabula Notlar, daha organik bir deneyim sunma amacıyla oluşturulmuş bir not alma uygulamasıdır.",
  // icons: {
  //   icon: [{ url: "../public/favicon/favicon.ico" }],
  //   apple: [
  //     { url: "../public/favicon/favicon-152-precomposed.png", sizes: "152x152" },
  //     { url: "../public/favicon/favicon-144-precomposed.png", sizes: "144x144" },
  //     { url: "../public/favicon/favicon-114-precomposed.png", sizes: "114x114" },
  //     { url: "../public/favicon/favicon-72-precomposed.png", sizes: "72x72" },
  //     { url: "../public/favicon/favicon-57-precomposed.png", sizes: "57x57" },
  //   ],
  //   shortcut: ["../public/favicon/favicon.ico"],
  //   other: [
  //     {
  //       url: "../public/favicon/favicon-32.png",
  //       rel: "icon",
  //     },
  //   ],
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="tr">
      <body className={montserrat.className}>
        <ThemeProvider attribute="class">
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
          <Header />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
