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
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta property="og:image" content="/og.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-svh bg-background`}
      >
        <Providers>
          <DefaultPaddedLayout>
            <Hotkeys />
            <Header />

            {children}

            <Footer />
          </DefaultPaddedLayout>
        </Providers>
      </body>
    </html>
  );
}
