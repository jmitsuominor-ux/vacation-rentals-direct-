import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const description = "Five kept homes across Oregon and Florida. Book direct.";

export const metadata: Metadata = {
  metadataBase: new URL("https://jandfrental.com"),
  title: "J & F Rental Co. — Book Direct",
  description,
  openGraph: {
    title: "J & F Rental Co.",
    description,
    type: "website",
    url: "https://jandfrental.com",
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
