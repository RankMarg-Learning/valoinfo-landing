import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers & Jobs | ValoInfo",
  description: "Join the ValoInfo squad! We are looking for passionate Social Media Managers, Video Editors, and Esports Journalists.",
  keywords: ["Valorant Jobs", "Esports Careers", "Esports Journalist", "Video Editor", "ValoInfo Careers"],
  openGraph: {
    title: "Careers & Jobs | ValoInfo",
    description: "Join the ValoInfo squad! We are looking for passionate Social Media Managers, Video Editors, and Esports Journalists.",
    url: "https://valoinfo.com/career",
    siteName: "ValoInfo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers & Jobs | ValoInfo",
    description: "Join the ValoInfo squad! We are looking for passionate Social Media Managers, Video Editors, and Esports Journalists.",
  }
};

export default function CareerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
