import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClientLayout } from "./client-layout";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next Store",
  description: "This E-Commerce created using NextJs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <link rel="icon" href="/img/icon.png" sizes="any" />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
