"use client";

import { useRouter } from "next/navigation";
import { useHotkeys } from "react-hotkeys-hook";

import { shortcuts } from "~/lib/shortcuts";

export function Hotkeys() {
  const router = useRouter();

  useHotkeys(shortcuts.home.key, () => {
    router.push("/");
  });

  useHotkeys(shortcuts.about.key, () => {
    router.push("/about");
  });

  useHotkeys(shortcuts.x.key, () => {
    window.open("https://x.com/just_moh_it", "_blank");
  });
  useHotkeys(shortcuts.linkedIn.key, () => {
    window.open("https://linkedin.com/in/just-moh-it", "_blank");
  });
  useHotkeys(shortcuts.github.key, () => {
    window.open("https://github.com/just-moh-it", "_blank");
  });

  return null;
}
