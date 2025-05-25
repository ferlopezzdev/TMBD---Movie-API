import { Poppins } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/common/header";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TMBD - Proyecto PR2",
  description: "Plataforma de películas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={poppins.className}>
      <body className="antialiased overflow-x-hidden">
        <Header />
        {children}
      </body>
    </html>
  );
}
