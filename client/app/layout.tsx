import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/context/QueryContext";

export const metadata: Metadata = {
  title: "Text2SQL App",
 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="sm:overflow-hidden">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
