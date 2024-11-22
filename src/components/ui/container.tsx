import { component$, Slot } from "@builder.io/qwik";
import { cn } from "~/lib/utils";

export const Container = component$<{ class?: string }>(({ class: className }) => {
  return (
    <div
      class={cn(
        "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8",
        className
      )}
    >
      <Slot />
    </div>
  );
}); 