import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ValoInfo - Your Ultimate Valorant Coverage Hub",
  description: "Live matches, tournaments, rankings, esports news, and everything Valorant — all in one place. Built for real Valorant fans.",
  keywords: ["Valorant", "Esports", "ValoInfo", "VCT", "Live Matches", "Tournaments", "Rankings", "Valorant news", "Valorant stats"],
  authors: [{ name: "ValoInfo" }],
  creator: "ValoInfo",
  publisher: "ValoInfo",
  openGraph: {
    title: "ValoInfo - Valorant Esports Hub",
    description: "The ultimate platform for Valorant matches, live scores, team rankings, and esports news.",
    url: "https://valoinfo.com",
    siteName: "ValoInfo",
    images: [
      {
        url: "https://valoinfo.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ValoInfo Platform",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ValoInfo - Valorant Esports Hub",
    description: "The ultimate platform for Valorant matches, live scores, team rankings, and esports news.",
    creator: "@thevaloinfo",
    images: ["https://valoinfo.com/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-4DDVFG5S3J" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-4DDVFG5S3J');
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
