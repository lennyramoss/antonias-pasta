import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const ltSoul = localFont({
  src: [
    {
      path: "../public/fonts/FONT SECUNDARIA/LTSoul-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/FONT SECUNDARIA/LTSoul-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/FONT SECUNDARIA/LTSoul-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/FONT SECUNDARIA/LTSoul-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-lt-soul",
});

const madeSunflower = localFont({
  src: "../public/fonts/FONT LOGO/made_sunflower/MADE Sunflower PERSONAL USE.otf",
  display: "swap",
  variable: "--font-made-sunflower",
});

const catalishHuntera = localFont({
  src: "../public/fonts/FONT LOGO/catalish_huntera/Catalish Huntera.otf",
  display: "swap",
  variable: "--font-catalish-huntera",
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
      <body
        className={`${ltSoul.variable} ${madeSunflower.variable} ${catalishHuntera.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
