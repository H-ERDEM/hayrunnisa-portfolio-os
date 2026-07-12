import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hayrunnisa Erdem | Computer Engineering",
  description: "Hayrunnisa Büşra Erdem'in yapay zekâ, veri, web ve kuantum odaklı kişisel portföyü.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
