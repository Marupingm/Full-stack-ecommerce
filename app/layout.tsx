import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import ShoppingCartModal from "./components/ShoppingCartModal";
import Providers from "./components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TopsyCommerce - Your Fashion Destination",
  description: "Discover the latest trends in fashion for Men, Women, and Teens. Shop our curated collection of clothing and accessories.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_API_URL || process.env.VERCEL_URL || 'http://localhost:3000'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <ShoppingCartModal />
          {children}
        </Providers>
      </body>
    </html>
  );
}
// Modified on 2025-02-19 00:50:51
// Modified on 2025-02-19 00:52:39
