import { component$ } from "@builder.io/qwik";
import { EmailForm } from "~/components/shared/email-form/email-form";
import { cn } from "~/lib/utils";

export interface HeroProps {
  class?: string;
}

export const Hero = component$<HeroProps>(({ class: className }) => {
  return (
    <div class={cn("flex min-h-[80vh] flex-col items-center justify-center text-center", className)}>
      <div class="max-w-4xl px-4">
        <h1 class="mb-8 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          Nurture Community,
          <br />
          Not Technology
        </h1>
        <p class="mx-auto mb-12 max-w-2xl text-xl text-muted-foreground">
          Coming soon: A simple allplatform that lets you focus on what matters most - building authentic relationships and fostering meaningful connections in your congregation.
        </p>
        
        <EmailForm 
          onSubmit$={async (email) => {
            // Add your email submission logic here
            console.log("Submitting email:", email);
          }}
        />
      </div>
    </div>
  );
}); 