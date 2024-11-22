import { component$, useSignal, $, type PropFunction } from "@builder.io/qwik";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

interface EmailFormProps {
  onSubmit$?: PropFunction<(email: string) => void>;
  buttonText?: string;
  placeholder?: string;
  class?: string;
  description?: string;
}

export const EmailForm = component$<EmailFormProps>(({
  onSubmit$,
  buttonText = "Get Updates",
  placeholder = "Enter your email",
  description = "Be the first to know when we launch",
  class: className
}) => {
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
      await onSubmit$?.(email.value);
      success.value = true;
      email.value = ""; // Clear form on success
    } catch (err) {
      error.value = "Failed to subscribe. Please try again.";
    } finally {
      loading.value = false;
    }
  });

  return (
    <form
      preventdefault:submit
      onSubmit$={handleSubmit}
      class={className}
      aria-label="Newsletter signup"
    >
      <div class="mx-auto max-w-md space-y-4">
        <div class="flex gap-3">
          <Input
            type="email"
            required
            placeholder={placeholder}
            value={email.value}
            onInput$={(e) => email.value = (e.target as HTMLInputElement).value}
            aria-label="Email address"
            disabled={loading.value}
          />
          <Button
            type="submit"
            size="lg"
            disabled={loading.value}
          >
            {loading.value ? "..." : buttonText}
          </Button>
        </div>
        
        {description && !error.value && !success.value && (
          <p class="text-sm text-muted-foreground">
            {description}
          </p>
        )}
        
        {error.value && (
          <p class="text-sm text-destructive" role="alert">
            {error.value}
          </p>
        )}
        
        {success.value && (
          <p class="text-sm text-green-600" role="alert">
            Thanks for subscribing!
          </p>
        )}
      </div>
    </form>
  );
}); 