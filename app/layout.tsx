import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";
import cx from "classnames";

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  preload: true,
  display: "swap",
  subsets: ["latin", "latin-ext"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cx(inter.className, "dark")}>
      <body className="bg- w-full dark:bg-[#151515] dark:text-white">
        {children}
        <Navbar />
      </body>
    </html>
  );
}
