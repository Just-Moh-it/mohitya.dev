import { useNavigate } from "@tanstack/react-router";
import { useHotkeys } from "react-hotkeys-hook";
import { shortcuts } from "~/lib/shortcuts";

export function Hotkeys() {
  const navigate = useNavigate();

  useHotkeys(shortcuts.home.key, () => {
    navigate({ to: "/" });
  });

  useHotkeys(shortcuts.about.key, () => {
    navigate({ to: "/about" });
  });

  useHotkeys(shortcuts.blog.key, () => {
    navigate({ to: "/blog" });
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
