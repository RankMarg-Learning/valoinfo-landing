import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Valorant Crosshair Builder | ValoInfo",
  description: "Create, customize, and share Valorant crosshairs with our advanced interactive Crosshair Builder. Generate and parse import codes instantly.",
  keywords: ["Valorant Crosshair", "Crosshair Builder", "Valorant Codes", "VCRDB", "ValoInfo Crosshairs", "Valorant Settings"],
  openGraph: {
    title: "Valorant Crosshair Builder | ValoInfo",
    description: "Create, customize, and share Valorant crosshairs with our advanced interactive Crosshair Builder. Generate and parse import codes instantly.",
    url: "https://valoinfo.com/crosshair",
    siteName: "ValoInfo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Valorant Crosshair Builder | ValoInfo",
    description: "Create, customize, and share Valorant crosshairs with our advanced interactive Crosshair Builder.",
  }
};

export default function CrosshairLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
