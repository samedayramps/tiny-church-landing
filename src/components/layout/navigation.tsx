import { component$, useSignal } from "@builder.io/qwik";
import { Button } from "~/components/ui/button";
import { Container } from "~/components/ui/container";

export const Navigation = component$(() => {
  const menuOpen = useSignal(false);

  return (
    <nav 
      class="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      role="navigation"
      aria-label="Main navigation"
    >
      <Container>
        <div class="flex h-16 items-center justify-between">
          <a 
            href="/" 
            class="text-xl font-bold"
            aria-label="Tiny Church home"
          >
            Tiny Church
          </a>
          
          {/* Mobile menu button */}
          <button
            type="button"
            class="md:hidden"
            onClick$={() => menuOpen.value = !menuOpen.value}
            aria-expanded={menuOpen.value}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
          >
            <span class="sr-only">Open main menu</span>
            {/* Add menu icon */}
          </button>

          {/* Desktop navigation */}
          <div class="hidden md:flex items-center gap-6" role="menubar">
            <a href="#features" class="text-muted-foreground hover:text-foreground" role="menuitem">
              Features
            </a>
            <a href="#digital-presence" class="text-muted-foreground hover:text-foreground" role="menuitem">
              Digital Presence
            </a>
            <a href="#contact" class="text-muted-foreground hover:text-foreground" role="menuitem">
              Contact
            </a>
          </div>
          <div class="flex items-center gap-4">
            <Button variant="ghost">Sign in</Button>
            <Button>Get Started</Button>
          </div>
        </div>
      </Container>
    </nav>
  );
}); 