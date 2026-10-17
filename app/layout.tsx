import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hayrunnisa Büşra Erdem | AI & Software Engineer",
  description:
    "Portfolio of Hayrunnisa Büşra Erdem, Computer Engineering senior building LLM pipelines, RAG systems and AI agents, plus C#/.NET and Java applications.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
