import * as React from "react";
import { HotkeysProvider } from "react-hotkeys-hook";
import { useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { usePostHog } from "posthog-js/react";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { ThemeProvider } from "~/components/theme";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const key = import.meta.env.VITE_POSTHOG_KEY;
    if (!key) return;

    posthog.init(key, {
      api_host:
        import.meta.env.VITE_POSTHOG_HOST || "https://us.i.posthog.com",
      person_profiles: "identified_only",
      capture_pageview: false,
    });
  }, []);

  return (
    <PHProvider client={posthog}>
      <PostHogPageView />
      {children}
    </PHProvider>
  );
}

function PostHogPageView() {
  const routerState = useRouterState();
  const posthogClient = usePostHog();

  useEffect(() => {
    if (routerState.location.pathname && posthogClient) {
      let url = window.origin + routerState.location.pathname;
      const search = routerState.location.searchStr;
      if (search) {
        url = url + search;
      }
      posthogClient.capture("$pageview", { $current_url: url });
    }
  }, [routerState.location.pathname, routerState.location.searchStr, posthogClient]);

  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <HotkeysProvider>
        <PostHogProvider>{children}</PostHogProvider>
      </HotkeysProvider>
    </ThemeProvider>
  );
}
