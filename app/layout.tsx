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
