import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import appCss from "~/globals.css?url";
import { Header } from "~/components/header";
import { DefaultPaddedLayout } from "~/components/layout";
import { Footer } from "~/components/footer";
import { Hotkeys } from "~/components/hotkeys";
import { Providers } from "~/components/providers";
import { themeScript } from "~/components/theme";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Mohit - Personal Website" },
      {
        name: "description",
        content:
          "Hi, I'm Mohit. I'm a 20y/o building things I find cool on the internet. This is my place on the web for sharing things.",
      },
      { property: "og:title", content: "Mohit - Personal Website" },
      {
        property: "og:description",
        content:
          "Hi, I'm Mohit. I'm a 20y/o building things I find cool on the internet. This is my place on the web for sharing things.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/og/default.png" },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Mohit - Personal Website" },
      {
        name: "twitter:description",
        content:
          "Hi, I'm Mohit. I'm a 20y/o building things I find cool on the internet. This is my place on the web for sharing things.",
      },
      { name: "twitter:image", content: "/og/default.png" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Geist+Mono:wght@100..900&display=swap",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
    ],
  }),
  component: RootLayout,
});

function RootLayout() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="antialiased min-h-svh bg-background font-sans">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <Providers>
          <DefaultPaddedLayout>
            <Hotkeys />
            <Header />
            <Outlet />
            <Footer />
          </DefaultPaddedLayout>
        </Providers>
        <Scripts />
      </body>
    </html>
  );
}
