import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Daze & Dewy — Beauty, considered",
  description:
    "A thoughtful edit of beauty essentials, expressive color, and sensory rituals.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
