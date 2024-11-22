import { component$ } from "@builder.io/qwik";
import { routeLoader$, routeAction$, Form, z, zod$ } from "@builder.io/qwik-city";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const AUDIENCE_ID = "589aac68-2790-486e-bb58-20218cf66f5e";

// Get the email from the URL query parameter
export const useEmail = routeLoader$(({ url }) => {
  return url.searchParams.get('email') || '';
});

// Handle the unsubscribe action
export const useUnsubscribe = routeAction$(async (data, { fail }) => {
  try {
    const email = data.email.toLowerCase().trim();

    // Update the contact in Resend audience
    await resend.contacts.update({
      audienceId: AUDIENCE_ID,
      id: email,
      unsubscribed: true,
    });

    return {
      success: true,
      message: "You have been successfully unsubscribed."
    };
  } catch (error) {
    return fail(400, {
      message: "Failed to unsubscribe. Please try again."
    });
  }
}, zod$({
  email: z.string().email("Please provide a valid email address")
}));

export default component$(() => {
  const email = useEmail();
  const unsubscribe = useUnsubscribe();

  return (
    <div class="min-h-[50vh] flex items-center justify-center">
      <div class="max-w-md w-full space-y-8 p-8">
        <div class="text-center">
          <h1 class="text-2xl font-bold mb-2">Unsubscribe</h1>
          <p class="text-muted-foreground">
            We're sorry to see you go. Please confirm your email address to unsubscribe.
          </p>
        </div>

        {!unsubscribe.value?.success ? (
          <Form action={unsubscribe} class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-2" for="email">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                class="w-full px-3 py-2 border rounded-md"
                value={email.value}
              />
            </div>

            <button
              type="submit"
              class="w-full bg-destructive text-destructive-foreground hover:bg-destructive/90 px-4 py-2 rounded-md"
              disabled={unsubscribe.isRunning}
            >
              {unsubscribe.isRunning ? "Processing..." : "Unsubscribe"}
            </button>

            {unsubscribe.value?.fieldErrors?.email && (
              <p class="text-sm text-destructive mt-1">
                {unsubscribe.value.fieldErrors.email}
              </p>
            )}
          </Form>
        ) : (
          <div class="text-center space-y-4">
            <div class="text-green-600 font-medium">
              {unsubscribe.value.message}
            </div>
            <p class="text-sm text-muted-foreground">
              Note: It may take up to 48 hours for all communications to stop.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}); 