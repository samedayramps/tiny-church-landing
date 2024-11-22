export const SPACING = {
  section: {
    sm: "py-12 px-4",
    md: "py-16 px-4",
    lg: "py-24 px-4",
  },
  container: {
    sm: "max-w-3xl mx-auto",
    md: "max-w-4xl mx-auto",
    lg: "max-w-6xl mx-auto",
  },
} as const;

export const TYPOGRAPHY = {
  h1: "text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight",
  h2: "text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight",
  h3: "text-2xl md:text-3xl font-bold tracking-tight",
  body: "text-base md:text-lg text-muted-foreground",
} as const;

export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export const CONTAINER_SIZES = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  '2xl': 'max-w-screen-2xl',
} as const; 