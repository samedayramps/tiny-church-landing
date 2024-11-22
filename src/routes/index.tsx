import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Container } from "~/components/ui/container";
import { Hero } from "~/components/sections/hero";
import { Features } from "~/components/sections/features";
import { Focus } from "~/components/sections/focus";
import { StayUpdated } from "~/components/sections/stay-updated";
import { SPACING } from "~/lib/constants";

export default component$(() => {
  return (
    <div class="min-h-screen bg-background">
      <main>
        <Container>
          <Hero class={SPACING.section.lg} />
          <Features class={SPACING.section.lg} />
          <Focus class={SPACING.section.lg} />
          <StayUpdated class={SPACING.section.lg} />
        </Container>
      </main>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Tiny Church - Nurture Community",
  meta: [
    {
      name: "description",
      content: "A simple platform for building authentic relationships in your congregation",
    },
    {
      name: "keywords",
      content: "church management, community building, congregation, digital presence",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:image",
      content: "https://tinychurch.com/og-image.jpg",
    },
    {
      name: "twitter:creator",
      content: "@tinychurch",
    },
    {
      property: "og:title",
      content: "Tiny Church - Nurture Community",
    },
    {
      property: "og:description", 
      content: "A simple platform for building authentic relationships in your congregation",
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    }
  ],
  links: [
    {
      rel: "canonical",
      href: "https://tinychurch.com",
    },
  ],
};
