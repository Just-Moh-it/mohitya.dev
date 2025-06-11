import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "~/components/header";
import { DefaultPaddedLayout } from "~/components/layout";
import { Footer } from "~/components/footer";
import { Hotkeys } from "~/components/hotkeys";
import { Providers } from "~/components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mohit - Personal Website",
  description:
    "Hi, I'm Mohit. I'm a 20y/o building things I find cool on the internet. This is my place on the web for sharing things.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background`}
        >
          <DefaultPaddedLayout>
            <Hotkeys />
            <Header />

            {children}

            <Footer />
          </DefaultPaddedLayout>
        </body>
      </html>
    </Providers>
  );
}
