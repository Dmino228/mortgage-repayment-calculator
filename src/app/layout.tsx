import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mortgage Repayment Calculator",
  description: "Mortgage Repayment Calculator created by Dmino",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plusJakartaSans.className} antialiased bg-background flex justify-center items-center min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
