import {
  createContext,
  use,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  createIsomorphicFn,
  createClientOnlyFn,
} from "@tanstack/react-start";

export type UserTheme = "light" | "dark" | "system";
export type AppTheme = Exclude<UserTheme, "system">;

const STORAGE_KEY = "theme";
const VALID_THEMES: UserTheme[] = ["light", "dark", "system"];

const getStoredUserTheme = createIsomorphicFn()
  .server((): UserTheme => "system")
  .client((): UserTheme => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored && VALID_THEMES.includes(stored as UserTheme)
        ? (stored as UserTheme)
        : "system";
    } catch {
      return "system";
    }
  });

const setStoredTheme = createClientOnlyFn((theme: UserTheme) => {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {}
});

const getSystemTheme = createIsomorphicFn()
  .server((): AppTheme => "light")
  .client(
    (): AppTheme =>
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light",
  );

function resolveTheme(userTheme: UserTheme): AppTheme {
  return userTheme === "system" ? getSystemTheme() : userTheme;
}

const applyThemeToDOM = createClientOnlyFn((userTheme: UserTheme) => {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(resolveTheme(userTheme));
});

// Inline script that runs before hydration to prevent FOUC.
// Written as a real function for IDE support, then serialized to string.
export const themeScript: string = (() => {
  function setInitialTheme() {
    try {
      const stored = localStorage.getItem("theme") || "system";
      const valid = ["light", "dark", "system"].includes(stored)
        ? stored
        : "system";
      const resolved =
        valid === "system"
          ? window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light"
          : valid;
      document.documentElement.classList.add(resolved);
    } catch {
      const fallback = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      document.documentElement.classList.add(fallback);
    }
  }
  return `(${setInitialTheme.toString()})();`;
})();

type ThemeContextValue = {
  userTheme: UserTheme;
  appTheme: AppTheme;
  setTheme: (theme: UserTheme) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [userTheme, setUserTheme] = useState<UserTheme>(getStoredUserTheme);

  useEffect(() => {
    applyThemeToDOM(userTheme);
  }, [userTheme]);

  useEffect(() => {
    if (userTheme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => applyThemeToDOM("system");
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [userTheme]);

  const setTheme = (next: UserTheme) => {
    setUserTheme(next);
    setStoredTheme(next);
    applyThemeToDOM(next);
  };

  return (
    <ThemeContext value={{ userTheme, appTheme: resolveTheme(userTheme), setTheme }}>
      {children}
    </ThemeContext>
  );
}

export function useTheme() {
  const ctx = use(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
