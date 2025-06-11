"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { HotkeysProvider } from "react-hotkeys-hook";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <HotkeysProvider>{children}</HotkeysProvider>
    </NextThemesProvider>
  );
}
