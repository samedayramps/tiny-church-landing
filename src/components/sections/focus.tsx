import { component$ } from "@builder.io/qwik";
import { LuCheck } from "@qwikest/icons/lucide";
import { cn } from "~/lib/utils";

export interface FocusProps {
  class?: string;
}

export const Focus = component$<FocusProps>(({ class: className }) => {
  const benefits = [
    {
      text: "Professionally managed website that stays current",
    },
    {
      text: "Automatic updates and maintenance handled for you",
    },
    {
      text: "Best-in-class security and performance",
    },
    {
      text: "Expert support when you need it",
    },
  ];

  return (
    <section class={cn("py-24 px-4 bg-background", className)}>
      <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Left column - Text content */}
        <div class="space-y-8">
          <div class="space-y-6">
            <h2 class="text-4xl font-bold tracking-tight">
              Focus on Your Community
            </h2>
            <p class="text-xl text-muted-foreground">
              Stop spending time managing technology. We'll handle your digital presence so you can invest in what matters most - your people and your mission.
            </p>
          </div>

          {/* Benefits list */}
          <ul class="space-y-4">
            {benefits.map((benefit) => (
              <li key={benefit.text} class="flex items-center gap-3">
                <div class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary">
                  <LuCheck class="h-4 w-4 text-primary-foreground" />
                </div>
                <span class="text-muted-foreground">{benefit.text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right column - Placeholder for images/graphics */}
        <div class="relative grid grid-cols-2 gap-4">
          <div class="h-full w-full rounded-2xl bg-muted" />
          <div class="h-full w-full rounded-2xl bg-muted" />
          <div class="h-full w-full rounded-2xl bg-muted" />
          <div class="h-full w-full rounded-2xl bg-muted" />
        </div>
      </div>
    </section>
  );
}); 