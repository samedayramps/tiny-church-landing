import { $, useSignal, useOnWindow } from "@builder.io/qwik";

type Theme = "light" | "dark" | "system";

export function useTheme() {
  const theme = useSignal<Theme>("system");

  // Listen for system theme changes using useOnWindow
  useOnWindow(
    "matchmedia",
    $((event: MediaQueryListEvent) => {
      if (theme.value === "system") {
        document.documentElement.classList.toggle("dark", event.matches);
      }
    })
  );

  // Initialize theme based on system preference
  if (typeof window !== 'undefined') {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (theme.value === "system") {
      document.documentElement.classList.toggle("dark", isDark);
    }
  }

  const toggleTheme = $(() => {
    theme.value = theme.value === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", theme.value === "dark");
  });

  return {
    theme: theme.value,
    toggleTheme,
  };
} 