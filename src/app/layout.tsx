import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import styles from "./layout.module.css";
import Image from "next/image";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chico Custom Lab",
  description: "Custom websites, custom t-shirts, custom stickers, vinyl",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className={styles.navbar}>

        <div>
        <Image src="/images/Chicocustom.png" alt="Chico Custom Lab" width={120} height={40}/>
        </div>
        <div>
            <Link href="/" className={styles["nav-item"]}>Home</Link>
            <Link href="/shop" className={styles["nav-item"]}>Shop</Link>
            <Link href="/contact" className={styles["nav-item"]}>Contact</Link>
          </div>
      </nav>
        {children}
      </body>
    </html>
  );
}
