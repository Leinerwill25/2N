import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "2N - Casa de Representación",
  description: "Empresa venezolana dedicada a la importación, distribución y comercialización de productos farmacéuticos.",
};

export const viewport = {
  colorScheme: 'light',
  themeColor: '#1A3A8F',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} h-full antialiased font-sans overflow-x-hidden`}
      style={{ colorScheme: 'light' }}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        {children}
        {/* Botón flotante de WhatsApp movido a la página principal */}
      </body>
    </html>
  );
}
