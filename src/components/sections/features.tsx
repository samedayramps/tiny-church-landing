import { component$ } from "@builder.io/qwik";
import { LuUsers, LuSettings, LuGlobe } from "@qwikest/icons/lucide";
import { cn } from "~/lib/utils";

export interface FeaturesProps {
  class?: string;
}

export const Features = component$<FeaturesProps>(({ class: className }) => {
  const features = [
    {
      icon: LuUsers,
      title: "Simple Member Management",
      description:
        "Keep track of your congregation with an easy-to-use member directory. Perfect for small churches.",
    },
    {
      icon: LuSettings,
      title: "Focus on Ministry",
      description:
        "We handle all the technical details so you can dedicate your time to what matters most - your community.",
    },
    {
      icon: LuGlobe,
      title: "Share Your Story",
      description:
        "A welcoming digital presence that authentically reflects your church's heart for community.",
    },
  ];

  return (
    <section class={cn("py-24 px-4 bg-muted/50", className)}>
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold mb-4">Built for Real Community</h2>
          <p class="text-xl text-muted-foreground max-w-2xl mx-auto">
            Simple tools that support authentic relationships and meaningful
            connections, not complicated systems that get in the way.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              class="rounded-lg p-6 bg-background border border-border"
            >
              <div class="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mb-4">
                <feature.icon class="w-6 h-6 text-foreground" />
              </div>
              <h3 class="text-xl font-semibold mb-2">{feature.title}</h3>
              <p class="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}); 