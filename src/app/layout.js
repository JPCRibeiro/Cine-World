import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import ScrollTop from "@/components/scrollTop";
import { SearchProvider } from "@/components/provider";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Cine World",
  description: "Um Mundo onde você fica por dentro de tudo no cinema.",
  icons: {
    icon: '/icon.svg',
  },
};

export default function RootLayout({ children, pageProps }) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <SearchProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <Header/>
          </Suspense>
          <div {...pageProps}>
            {children}
          </div>
        </SearchProvider>
        <ScrollTop/>
      </body>
    </html>
  );
}