import { component$ } from "@builder.io/qwik";
import { LuFacebook, LuTwitter, LuInstagram } from "@qwikest/icons/lucide";

export const Footer = component$(() => {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: "Product",
      links: ["Features", "Digital Presence", "Pricing", "Demo"],
    },
    {
      title: "Company",
      links: ["About", "Blog", "Contact", "Privacy Policy"],
    },
    {
      title: "Resources",
      links: ["Documentation", "Help Center", "Community", "Terms of Service"],
    },
  ];

  return (
    <footer class="border-t border-border">
      <div class="max-w-6xl mx-auto px-4 py-12">
        {/* Navigation Grid */}
        <div class="grid grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12 mb-12">
          {sections.map((section) => (
            <div key={section.title} class="space-y-3">
              <h4 class="font-medium text-sm">{section.title}</h4>
              <ul class="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      class="text-muted-foreground hover:text-foreground text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div class="flex flex-col md:flex-row justify-between items-center pt-8 border-t">
          <p class="text-sm text-muted-foreground mb-4 md:mb-0">
            © {currentYear} Tiny Church. All rights reserved.
          </p>
          <div class="flex items-center gap-4">
            <a href="#" class="text-muted-foreground hover:text-foreground">
              <LuFacebook class="h-5 w-5" />
            </a>
            <a href="#" class="text-muted-foreground hover:text-foreground">
              <LuTwitter class="h-5 w-5" />
            </a>
            <a href="#" class="text-muted-foreground hover:text-foreground">
              <LuInstagram class="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}); 