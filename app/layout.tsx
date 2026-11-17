import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const description = "Curated stays. Genuine hospitality. Five homes across Oregon and Florida. Book direct.";

export const metadata: Metadata = {
  metadataBase: new URL("https://hamasuhomes.com"),
  title: "Hamasu Homes — Book Direct",
  description,
  openGraph: {
    title: "Hamasu Homes",
    description,
    type: "website",
    url: "https://hamasuhomes.com",
    images: ["/images/warren-house/warren-house-14.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hamasu Homes",
    description,
    images: ["/images/warren-house/warren-house-14.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
