import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./global.css";

const geistMono = Geist_Mono({
  variable: "--font-primary",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Deck of Cards",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <body className={`${geistMono.variable}`}>{children}</body>
    </html>
  );
}
