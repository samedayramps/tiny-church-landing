import { component$, useStylesScoped$, Slot, $ } from "@builder.io/qwik";
import type { Toast as ToastType } from "~/hooks/use-toast-store";
import { cn } from "~/lib/utils";

export interface ToastProps extends ToastType {
  onClose$?: () => void;
}

export const Toast = component$<ToastProps>(({ 
  title, 
  description, 
  type = 'default',
  onClose$ 
}) => {
  useStylesScoped$(`
    .toast {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding: 1rem;
      border-radius: 0.5rem;
      background-color: hsl(var(--background));
      border: 1px solid hsl(var(--border));
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      animation: slideIn 0.2s ease-out;
    }

    .toast-success {
      border-color: hsl(var(--success));
    }

    .toast-error {
      border-color: hsl(var(--destructive));
    }

    .close-button {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      padding: 0.25rem;
      cursor: pointer;
      opacity: 0.5;
      transition: opacity 0.2s;
    }

    .close-button:hover {
      opacity: 1;
    }

    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `);

  return (
    <div 
      class={cn(
        "toast",
        type === 'success' && "toast-success",
        type === 'error' && "toast-error"
      )}
      role="alert"
    >
      {title && <div class="font-semibold">{title}</div>}
      {description && <div class="text-sm text-muted-foreground">{description}</div>}
      <button 
        onClick$={$(() => onClose$?.())}
        class="close-button"
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
});

export const ToastContainer = component$(() => {
  useStylesScoped$(`
    .toast-container {
      position: fixed;
      bottom: 1rem;
      right: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      z-index: 50;
      max-width: 420px;
      width: 100%;
      padding: 1rem;
    }
  `);

  return (
    <div class="toast-container">
      <Slot />
    </div>
  );
});
