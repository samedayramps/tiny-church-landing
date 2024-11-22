import { component$, useSignal, type PropFunction } from "@builder.io/qwik";
import { Button } from "./button";
import { Input } from "./input";

export const EmailForm = component$<{
  onSubmit$: PropFunction<(email: string) => void>;
  buttonText?: string;
  placeholder?: string;
}>((props) => {
  const email = useSignal("");
  const loading = useSignal(false);

  return (
    <form
      preventdefault:submit
      onSubmit$={async () => {
        loading.value = true;
        await props.onSubmit$(email.value);
        loading.value = false;
      }}
      class="flex w-full max-w-sm gap-3"
    >
      <Input
        type="email"
        placeholder={props.placeholder ?? "Enter your email"}
        value={email.value}
        onInput$={(e) => (email.value = (e.target as HTMLInputElement).value)}
        required
        class="flex-1"
      />
      <Button
        type="submit"
        size="lg"
        disabled={loading.value}
      >
        {loading.value ? "..." : props.buttonText ?? "Subscribe"}
      </Button>
    </form>
  );
}); 