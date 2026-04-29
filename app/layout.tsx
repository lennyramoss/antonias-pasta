import type { Metadata } from "next";
import { Dancing_Script, Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dancing-script",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://antoniaspasta.com"),
  title: "Antonias Pasta | Pastas artesanales y barra de tragos en Tigre",
  description:
    "Restaurante de pastas artesanales y barra de tragos en Tigre, Buenos Aires. Menú ejecutivo, menú experiencia, cócteles y reservas.",
  applicationName: "Antonias Pasta",
  keywords: [
    "Antonias Pasta",
    "pastas artesanales",
    "restaurante en Tigre",
    "barra de tragos",
    "cócteles",
    "Buenos Aires",
    "menú ejecutivo",
    "reservas Tigre",
  ],
  authors: [{ name: "Antonias Pasta" }],
  creator: "Antonias Pasta",
  publisher: "Antonias Pasta",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Antonias Pasta | Pastas artesanales y barra de tragos en Tigre",
    description:
      "Restaurante de pastas artesanales y barra de tragos en Tigre, Buenos Aires. Menú ejecutivo, menú experiencia, cócteles y reservas.",
    url: "/",
    siteName: "Antonias Pasta",
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Antonias Pasta | Pastas artesanales y barra de tragos en Tigre",
    description:
      "Restaurante de pastas artesanales y barra de tragos en Tigre, Buenos Aires. Menú ejecutivo, menú experiencia, cócteles y reservas.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-AR">
      <body className={`${montserrat.variable} ${dancingScript.variable}`}>{children}</body>
    </html>
  );
}
