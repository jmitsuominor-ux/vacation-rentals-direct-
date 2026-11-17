import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const description = "Five kept homes across Oregon and Florida. Book direct.";

export const metadata: Metadata = {
  metadataBase: new URL("https://hamasuhomes.com"),
  title: "Rogue Rental Houses — Book Direct",
  description,
  openGraph: {
    title: "Rogue Rental Houses",
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
