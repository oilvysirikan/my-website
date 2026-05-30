# shadcn-vue Component Library Overview

> A comprehensive guide to shadcn-vue components for modern Vue.js applications

---

## 📋 Table of Contents

1. [Introduction](#introduction)
2. [Architecture & Technology Stack](#architecture--technology-stack)
3. [Component Library](#component-library)
4. [Project Structure](#project-structure)
5. [Key Features](#key-features)
6. [Implementation Guide](#implementation-guide)
7. [Portfolio Enhancement](#portfolio-enhancement)
8. [Best Practices](#best-practices)

---

## 🎯 Introduction

**shadcn-vue** is the Vue.js port of the popular shadcn/ui component library. It provides a modern, accessible, and highly customizable set of UI components built with:

- **Radix Vue**: Headless UI primitives for accessibility
- **Tailwind CSS**: Utility-first CSS framework
- **Class Variance Authority**: Type-safe component variants
- **Vue 3**: Modern reactive framework with Composition API

### Why shadcn-vue?

- ✅ **Copy & Paste Architecture**: Components are copied into your project, giving you full control
- ✅ **Fully Customizable**: Modify every aspect of components to match your design system
- ✅ **TypeScript Support**: Full type safety and IntelliSense
- ✅ **Accessible**: Built on Radix primitives with WCAG compliance
- ✅ **Tree-shakeable**: Bundle only what you use
- ✅ **Modern Design**: Contemporary aesthetics with dark mode support

---

## 🏗️ Architecture & Technology Stack

### Core Dependencies

```json
{
  "dependencies": {
    "vue": "^3.4.0",
    "radix-vue": "^1.8.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0",
    "tailwindcss-animate": "^1.0.7"
  }
}
```

### Supported Templates

| Template | Use Case | SSR Support |
|----------|----------|-------------|
| **Vite** | SPA, Standard Projects | ❌ |
| **Nuxt** | SSR, SSG, SEO-critical | ✅ |
| **Laravel** | Full-stack Applications | ✅ |
| **Astro** | Static Sites, Content-heavy | ✅ |

### Build Tools & Config

- **Vite** - Fast build tool and dev server
- **TypeScript** - Type safety and better DX
- **Tailwind CSS v4** - Latest utility CSS framework
- **PostCSS** - CSS processing and optimization

---

## � Component Library

### 📦 Core Components

#### Navigation & Layout
- **[Accordion](#)** - Collapsible content panels
- **[Breadcrumb](#)** - Navigation path indicator
- **[Separator](#)** - Visual content dividers
- **[Sheet](#)** - Side panel/drawer component

#### Data Display
- **[Avatar](#)** - User profile images and initials
- **[Badge](#)** - Status indicators and labels
- **[Card](#)** - Content containers with variants
- **[Carousel](#)** - Image and content sliders
- **[Skeleton](#)** - Loading state placeholders

#### Form Elements
- **[Button](#)** - Primary action components with variants
- **[Input](#)** - Text input fields
- **[Textarea](#)** - Multi-line text input
- **[Checkbox](#)** - Boolean selection inputs
- **[Radio Group](#)** - Single choice selection
- **[Select](#)** - Dropdown selection component
- **[Switch](#)** - Toggle switches
- **[Slider](#)** - Range selection inputs
- **[Calendar](#)** - Date picker and calendar display
- **[Date Picker](#)** - Advanced date selection

#### Feedback & Communication
- **[Alert](#)** - Informational messages
- **[Alert Dialog](#)** - Confirmation dialogs
- **[Dialog](#)** - Modal overlays
- **[Toast](#)** - Non-intrusive notifications
- **[Tooltip](#)** - Hover information displays
- **[Hover Card](#)** - Rich hover content

#### Advanced Components
- **[Command](#)** - Command palette (Spotlight-style search)
- **[Data Table](#)** - Advanced data tables
- **[Tabs](#)** - Content switching interface
- **[Progress](#)** - Loading and completion indicators
- **[Resizable](#)** - Resizable panel components
- **[Scroll Area](#)** - Custom scrollable containers

---

## 📂 Project Structure

```
my-website/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn-vue components
│   │   │   ├── button/
│   │   │   ├── card/
│   │   │   ├── dialog/
│   │   │   └── ...
│   │   └── custom/          # Custom application components
│   ├── composables/         # Vue composition functions
│   ├── lib/                 # Utility functions
│   │   ├── utils.ts        # General utilities (cn, etc.)
│   │   └── validators.ts   # Form validation helpers
│   ├── styles/              # Global styles
│   │   └── globals.css     # Tailwind directives
│   ├── views/               # Page components
│   └── App.vue             # Root component
├── public/                  # Static assets
├── components.json          # shadcn-vue configuration
├── tailwind.config.js       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── vite.config.js           # Vite build configuration
```

---

## ✨ Key Features

### 1. Copy-Paste Architecture

Components are copied directly into your project:

```bash
npx shadcn-vue@latest add button
```

This creates the component file in your project under `src/components/ui/button/`

### 2. Component Customization

Each component can be fully modified:

```vue
<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
</script>
```

### 3. TypeScript Support

Full type safety with IntelliSense:

```typescript
import type { VariantProps } from 'class-variance-authority'

type ButtonVariants = VariantProps<typeof buttonVariants>
```

### 4. Accessibility

Built on Radix Vue primitives for WCAG compliance:
- Keyboard navigation
- Screen reader support
- Focus management
- ARIA attributes

### 5. Theme System

Support for light/dark modes and custom themes:

```javascript
// tailwind.config.js
module.exports = {
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        // ... more color tokens
      },
    },
  },
}
```

---

## 🚀 Implementation Guide

### Option 1: Integration into Existing Project

#### Prerequisites

```bash
# Install required dependencies
npm install vue@latest radix-vue class-variance-authority clsx tailwind-merge tailwindcss-animate
```

#### Configuration

1. **Update `tailwind.config.js`**:

```javascript
const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

2. **Create `src/lib/utils.ts`**:

```typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

3. **Add CSS variables** to `src/style.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

4. **Initialize shadcn-vue**:

```bash
npx shadcn-vue@latest init
```

5. **Add components**:

```bash
npx shadcn-vue@latest add button card dialog
```

### Option 2: Start New Project with Template

```bash
# Create new project
npm create vue@latest my-project

# Navigate to project
cd my-project

# Initialize shadcn-vue
npx shadcn-vue@latest init

# Add desired components
npx shadcn-vue@latest add button card dialog carousel
```

---

## 🎨 Portfolio Enhancement

### Recommended Components for Portfolio

#### 1. Dialog Component
Replace current modal with shadcn Dialog for better accessibility and animations:

```vue
<Dialog>
  <DialogTrigger>Open Portfolio</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Project Details</DialogTitle>
      <DialogDescription>View project information</DialogDescription>
    </DialogHeader>
    <!-- Portfolio content -->
  </DialogContent>
</Dialog>
```

#### 2. Carousel Component
Enhance image gallery with smooth carousel:

```vue
<Carousel>
  <CarouselContent>
    <CarouselItem v-for="image in images" :key="image">
      <img :src="image" alt="Portfolio image" />
    </CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
```

#### 3. Card Component
Modern portfolio cards with variants:

```vue
<Card>
  <CardHeader>
    <CardTitle>Project Name</CardTitle>
    <CardDescription>Project description</CardDescription>
  </CardHeader>
  <CardContent>
    <!-- Project content -->
  </CardContent>
  <CardFooter>
    <Button>View Details</Button>
  </CardFooter>
</Card>
```

#### 4. Badge Component
Professional category badges:

```vue
<Badge variant="default">LED Sign</Badge>
<Badge variant="secondary">Acrylic</Badge>
<Badge variant="outline">Lightbox</Badge>
```

#### 5. Tabs Component
Replace current filter system:

```vue
<Tabs defaultValue="all">
  <TabsList>
    <TabsTrigger value="all">All</TabsTrigger>
    <TabsTrigger value="led">LED Sign</TabsTrigger>
    <TabsTrigger value="acrylic">Acrylic</TabsTrigger>
  </TabsList>
  <TabsContent value="all">
    <!-- All projects -->
  </TabsContent>
</Tabs>
```

#### 6. Skeleton Component
Professional loading states:

```vue
<Skeleton class="h-48 w-full" />
<Skeleton class="h-4 w-3/4 mt-4" />
<Skeleton class="h-4 w-1/2 mt-2" />
```

### Implementation Priority

| Priority | Component | Impact | Effort |
|----------|-----------|--------|--------|
| **High** | Dialog, Card, Button | High user experience improvement | Low |
| **Medium** | Carousel, Badge, Tabs | Enhanced interactivity | Medium |
| **Low** | Skeleton, Tooltip, Command | Nice-to-have features | Low |

---

## 📋 Best Practices

### Component Usage

1. **Use Semantic Props**: Leverage component variants instead of custom classes
2. **Maintain Consistency**: Use the same component patterns across the application
3. **Accessibility First**: Always test keyboard navigation and screen reader support
4. **Performance**: Lazy load components when appropriate

### Customization Guidelines

1. **Variant Extension**: Add custom variants to existing components
2. **Theme Integration**: Match component colors with your brand
3. **Responsive Design**: Ensure components work on all screen sizes
4. **Animation Control**: Use built-in animations for consistent behavior

### Code Organization

```
src/
├── components/
│   ├── ui/                    # shadcn-vue components (don't modify)
│   └── custom/                # Custom components using shadcn
│       ├── PortfolioCard.vue  # Extended card component
│       ├── PortfolioModal.vue  # Custom dialog wrapper
│       └── FilterTabs.vue      # Custom tabs implementation
```

### TypeScript Best Practices

```typescript
// Define component props with proper types
interface PortfolioCardProps {
  project: Portfolio
  variant?: 'default' | 'featured'
  onProjectClick?: (project: Portfolio) => void
}

// Use component variants
const cardVariants = cva(baseClasses, {
  variants: {
    variant: {
      default: 'bg-card text-card-foreground',
      featured: 'bg-primary text-primary-foreground border-primary',
    }
  }
})
```

---

## 🔧 Troubleshooting

### Common Issues

#### 1. Tailwind Classes Not Working
```bash
# Ensure tailwind.config.js includes your component paths
content: [
  './index.html',
  './src/**/*.{vue,js,ts,jsx,tsx}',
]
```

#### 2. TypeScript Errors
```bash
# Install required types
npm install -D @types/node
```

#### 3. Component Not Found
```bash
# Verify component installation
npx shadcn-vue@latest add [component-name]
```

#### 4. Styles Not Applying
```css
/* Ensure base styles are imported */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## 📚 Resources

### Official Documentation
- [shadcn-vue Documentation](https://www.shadcn-vue.com)
- [Radix Vue Documentation](https://www.radix-vue.com)
- [Tailwind CSS Documentation](https://tailwindcss.com)

### Community
- [GitHub Repository](https://github.com/radix-vue/shadcn-vue)
- [Discord Community](https://discord.gg/shadcn)
- [Twitter/X](https://twitter.com/shadcn)

### Examples & Templates
- [Official Examples](https://www.shadcn-vue.com/examples)
- [Community Components](https://www.shadcn-vue.com/docs/components)

---

## 🚀 Getting Started

### Quick Start Commands

```bash
# Initialize shadcn-vue
npx shadcn-vue@latest init

# Add specific components
npx shadcn-vue@latest add button card dialog

# Add all components
npx shadcn-vue@latest add --all
```

### Recommended First Components

For a portfolio website, start with these essential components:

```bash
npx shadcn-vue@latest add button card dialog badge tabs carousel skeleton
```

---

## 📝 License

This documentation is part of the shadcn-vue ecosystem. Components are copied into your project and can be freely modified and used according to your project's license.

---

**Last Updated**: 2026-05-30  
**Version**: 1.0.0  
**Maintained by**: SignCraft Studio Development Team