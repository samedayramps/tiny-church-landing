import { component$, Slot, useVisibleTask$ } from "@builder.io/qwik";
import { Navigation } from "~/components/layout/navigation";
import { Footer } from "~/components/layout/footer";
import { useTheme } from "~/hooks/use-theme";

export default component$(() => {
  const { theme } = useTheme();

  // Handle system theme changes
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      if (theme === "system") {
        document.documentElement.classList.toggle("dark", e.matches);
      }
    };
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  });

  return (
    <div class="flex min-h-screen flex-col antialiased bg-background">
      <Navigation />
      <main class="flex-1 relative scroll-smooth">
        <Slot />
      </main>
      <Footer />
    </div>
  );
});
