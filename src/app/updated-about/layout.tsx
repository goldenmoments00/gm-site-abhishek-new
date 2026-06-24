import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Golden Moment – Our Story | Wedding Photography",
  description:
    "Golden Moment is a premier wedding photography agency based in Agartala, Tripura. We capture timeless love stories with artistic elegance and cinematic storytelling.",
  openGraph: {
    title: "Golden Moment – Our Story | Wedding Photography",
    description:
      "Golden Moment is a premier wedding photography agency based in Agartala, Tripura. We capture timeless love stories with artistic elegance and cinematic storytelling.",
  },
  twitter: {
    title: "Golden Moment – Our Story | Wedding Photography",
    description:
      "Golden Moment is a premier wedding photography agency based in Agartala, Tripura. We capture timeless love stories with artistic elegance and cinematic storytelling.",
  },
  icons: {
    icon: "/webflow/through/images/68472ffc8664ae8b842df4f5_Fav.png",
    apple: "/webflow/through/images/68473001370105b1a3e256cd_Web.png",
  },
};

export default function UpdatedAboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
