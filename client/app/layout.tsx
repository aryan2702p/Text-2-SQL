import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/context/QueryContext";
import { Toaster } from "react-hot-toast";


export const metadata: Metadata = {
  title: "Text2SQL App",
  description: "Text2SQL App",
  icons: "./icon.png"

 
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
        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}
