import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | Golden Moment – Wedding Photography",
  description:
    "Explore our stunning wedding photography portfolio. Golden Moment captures timeless love stories with artistic elegance in Agartala, Tripura and beyond.",
  openGraph: {
    title: "Gallery | Golden Moment – Wedding Photography",
    description:
      "Explore our stunning wedding photography portfolio. Golden Moment captures timeless love stories with artistic elegance in Agartala, Tripura and beyond.",
    images: ["/webflow/pictlens/images/681830d70692c5e487e2bd7f_open-graph-image.jpg"],
  },
  twitter: {
    title: "Gallery | Golden Moment – Wedding Photography",
    description:
      "Explore our stunning wedding photography portfolio. Golden Moment captures timeless love stories with artistic elegance in Agartala, Tripura and beyond.",
    images: ["/webflow/pictlens/images/681830d70692c5e487e2bd7f_open-graph-image.jpg"],
  },
  icons: {
    icon: "/webflow/pictlens/images/681822e38e783498a0deda0d_favicon.svg",
    apple: "/webflow/pictlens/images/681822ea9a4b8505410684f2_webclip.svg",
  },
};

export default function PictlensLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
