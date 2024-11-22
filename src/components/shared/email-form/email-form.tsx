import { component$, useSignal, $, type PropFunction } from "@builder.io/qwik";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useToastStore, toast } from "~/hooks/use-toast-store";

interface EmailFormProps {
  onSubmit$?: PropFunction<(email: string) => void>;
  buttonText?: string;
  placeholder?: string;
  class?: string;
  description?: string;
}

export const EmailForm = component$<EmailFormProps>(({
  buttonText = "Get Updates",
  placeholder = "Enter your email",
  description = "Be the first to know when we launch",
  class: className
}) => {
  const email = useSignal("");
  const loading = useSignal(false);
  const errorSignal = useSignal("");
  const successSignal = useSignal(false);
  const toastStore = useToastStore();

  const handleSubmit = $(async (e: Event) => {
    e.preventDefault();
    if (!email.value) return;
    
    try {
      loading.value = true;
      errorSignal.value = "";

      // Create a promise that resolves after 1 second
      const delay = new Promise(resolve => setTimeout(resolve, 1000));

      // Run the API call and delay in parallel
      const [response] = await Promise.all([
        fetch('/api/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: email.value }),
        }),
        delay // This ensures we wait at least 1 second
      ]);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }

      // Only proceed with success actions if Resend confirmed subscription
      if (data.success) {
        // Track signup event in GTM
        const emailValue = email.value;
        email.value = ""; // Clear form on success
        successSignal.value = true;

        if (typeof window !== 'undefined' && window.dataLayer) {
          window.dataLayer.push({
            event: 'newsletter_signup',
            email: emailValue
          });
        }

        toast(toastStore, {
          title: "Success!",
          description: "Thanks for subscribing! Check your email for confirmation.",
          type: "success"
        });
      } else {
        throw new Error(data.error || 'Failed to subscribe');
      }

    } catch (err) {
      errorSignal.value = err instanceof Error ? err.message : "Failed to subscribe";
      toast(toastStore, {
        title: "Error",
        description: errorSignal.value,
        type: "error"
      });
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
        <div class="flex h-10 gap-3">
          <Input
            type="email"
            required
            placeholder={placeholder}
            value={email.value}
            onInput$={(e) => email.value = (e.target as HTMLInputElement).value}
            aria-label="Email address"
            disabled={loading.value}
            class="h-10"
          />
          <Button
            type="submit"
            size="default"
            disabled={loading.value}
            class="h-10 px-6 min-w-[120px]"
          >
            {loading.value ? (
              <div class="flex items-center justify-center gap-2">
                <svg
                  class="animate-spin h-5 w-5"
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
                <span>Loading...</span>
              </div>
            ) : (
              buttonText
            )}
          </Button>
        </div>
        
        {description && !errorSignal.value && !successSignal.value && (
          <p class="text-sm text-muted-foreground">
            {description}
          </p>
        )}
        
        {errorSignal.value && (
          <p class="text-sm text-destructive" role="alert">
            {errorSignal.value}
          </p>
        )}
        
        {successSignal.value && (
          <p class="text-sm text-green-600" role="alert">
            Thanks for subscribing! Check your email for confirmation.
          </p>
        )}
      </div>
    </form>
  );
}); 