import { component$, useSignal, $ } from "@builder.io/qwik";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";

export interface StayUpdatedProps {
  class?: string;
}

export const StayUpdated = component$<StayUpdatedProps>(({ class: className }) => {
  const email = useSignal("");
  const loading = useSignal(false);
  const error = useSignal("");
  const success = useSignal(false);

  const handleSubmit = $(async (e: Event) => {
    e.preventDefault();
    if (!email.value) return;

    try {
      loading.value = true;
      error.value = "";
      // Add form submission logic
      success.value = true;
    } catch (err) {
      error.value = "Failed to subscribe. Please try again.";
    } finally {
      loading.value = false;
    }
  });

  return (
    <section 
      class={cn("bg-primary text-primary-foreground py-24 px-4", className)}
      aria-labelledby="stay-updated-title"
    >
      <div class="max-w-2xl mx-auto text-center space-y-8">
        <h2 id="stay-updated-title" class="text-4xl font-bold tracking-tight">
          Stay Updated
        </h2>
        
        <form 
          onSubmit$={handleSubmit}
          class="max-w-md mx-auto space-y-4"
          aria-label="Newsletter signup"
        >
          <div class="flex gap-3">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email.value}
              onInput$={(event: Event) => {
                const input = event.target as HTMLInputElement;
                email.value = input.value;
              }}
              class="bg-primary-foreground/10 border-primary-foreground/20"
              aria-label="Email"
            />
            <Button size="lg" class="bg-white text-black hover:bg-gray-200" type="submit" disabled={loading.value}>
              {loading.value ? (
                <svg
                  class="animate-spin h-4 w-4 text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                "Get Updates"
              )}
            </Button>
          </div>
          {error.value && (
            <p class="text-red-400" role="alert">{error.value}</p>
          )}
          {success.value && (
            <p class="text-green-400" role="alert">Thanks for subscribing!</p>
          )}
        </form>
      </div>
    </section>
  );
}); 