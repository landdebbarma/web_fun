# AnToAnt Landing Page - Professional Folder Structure

## 📁 Project Structure

```
src/
├── app/                          # Application-level configuration
│   ├── providers/                # Context providers (Auth, Theme, etc.)
│   └── routes/                   # Route configuration
│
├── assets/                       # Static assets
│   ├── images/                   # Images
│   ├── icons/                    # Icon files
│   ├── fonts/                    # Custom fonts
│   └── videos/                   # Video files
│
├── components/                   # Reusable components
│   ├── common/                   # Common components used across features
│   │   ├── LoadingScreen/
│   │   └── PrivateRoute/
│   │
│   ├── layout/                   # Layout components
│   │   ├── Navbar/
│   │   └── Footer/
│   │
│   └── ui/                       # Base UI components (design system)
│       ├── Card/
│       ├── Marquee/
│       ├── Timeline/
│       └── ...
│
├── features/                     # Feature-based modules
│   ├── home/                     # Home page feature
│   │   └── components/           # Feature-specific components
│   │       ├── Hero/
│   │       ├── Bento/
│   │       ├── Product/
│   │       └── CTA/
│   │
│   ├── pricing/                  # Pricing feature
│   │   └── components/
│   │       ├── PricingDemo/
│   │       └── PricingContainer/
│   │
│   ├── AnToAnt-ai/                 # AnToAnt AI feature
│   │   └── components/
│   │
│   └── wishlist/                 # Wishlist feature
│       └── components/
│
├── hooks/                        # Global custom hooks
│   ├── useAuth.ts
│   ├── useMediaQuery.ts
│   └── ...
│
├── lib/                          # Third-party library configurations
│   └── utils.ts                  # Utility functions
│
├── pages/                        # Page components (route handlers)
│   ├── HomePage.tsx
│   ├── PricingPage.tsx
│   └── ...
│
├── styles/                       # Global styles
│   ├── index.css                 # Main stylesheet
│   └── globals.css               # Global CSS
│
├── types/                        # TypeScript type definitions
│   ├── index.ts                  # Exported types
│   └── components.ts             # Component prop types
│
├── constants/                    # Application constants
│   ├── routes.ts                 # Route paths
│   ├── config.ts                 # App configuration
│   └── index.ts                  # Barrel export
│
├── utils/                        # Utility functions
│   ├── animations.ts             # Animation helpers
│   └── formatters.ts             # Data formatters
│
├── App.tsx                       # Root App component
└── main.tsx                      # Application entry point
```

## 🎯 Key Principles

### 1. **Feature-Based Architecture**

- Each feature is self-contained in its own directory
- Features can be easily added, removed, or modified
- Promotes code reusability and maintainability

### 2. **Separation of Concerns**

- **Components**: Reusable UI components
- **Features**: Business logic and feature-specific components
- **Pages**: Route handlers that compose features
- **Lib/Utils**: Helper functions and utilities

### 3. **Path Aliases**

Use clean imports with `@` prefix:

```typescript
// ❌ Bad
import { Navbar } from "../../../components/layout/Navbar";

// ✅ Good
import { Navbar } from "@/components/layout";
```

Available aliases:

- `@/*` - Root src directory
- `@/components/*` - Components directory
- `@/features/*` - Features directory
- `@/lib/*` - Library utilities
- `@/hooks/*` - Custom hooks
- `@/types/*` - TypeScript types
- `@/constants/*` - Constants
- `@/utils/*` - Utility functions
- `@/assets/*` - Static assets

### 4. **Barrel Exports**

Each directory has an `index.ts` file for clean exports:

```typescript
// features/home/components/index.ts
export { default as Hero } from "./Hero";
export { Bento } from "./Bento";
export { Product } from "./Product";
export { default as CTA } from "./CTA";
```

Usage:

```typescript
import { Hero, Bento, Product, CTA } from "@/features/home/components";
```

## 📝 Naming Conventions

### Files and Folders

- **Components**: PascalCase (e.g., `Hero.tsx`, `Navbar.tsx`)
- **Utilities**: camelCase (e.g., `utils.ts`, `formatters.ts`)
- **Constants**: camelCase (e.g., `routes.ts`, `config.ts`)
- **Types**: camelCase (e.g., `components.ts`, `api.ts`)
- **Folders**: kebab-case for features (e.g., `AnToAnt-ai/`), PascalCase for components (e.g., `Hero/`)

### Code

- **Components**: PascalCase (e.g., `const HomePage = () => {}`)
- **Functions**: camelCase (e.g., `const formatDate = () => {}`)
- **Constants**: UPPER_SNAKE_CASE for true constants (e.g., `const API_URL = '...'`)
- **Types/Interfaces**: PascalCase (e.g., `interface UserProps {}`)

## 🚀 Adding New Features

### Step 1: Create Feature Directory

```bash
mkdir -p src/features/new-feature/components
```

### Step 2: Add Components

```bash
mkdir src/features/new-feature/components/NewComponent
touch src/features/new-feature/components/NewComponent/NewComponent.tsx
touch src/features/new-feature/components/NewComponent/index.ts
```

### Step 3: Create Barrel Export

```typescript
// src/features/new-feature/components/index.ts
export { default as NewComponent } from "./NewComponent";
```

### Step 4: Create Page (if needed)

```typescript
// src/pages/NewFeaturePage.tsx
import { NewComponent } from "@/features/new-feature/components";

const NewFeaturePage = () => {
  return <NewComponent />;
};

export default NewFeaturePage;
```

## 🎨 Component Organization

### UI Components (`components/ui/`)

- Atomic, reusable components
- No business logic
- Highly configurable via props
- Examples: Button, Card, Input, Modal

### Layout Components (`components/layout/`)

- Page structure components
- Examples: Navbar, Footer, Sidebar

### Common Components (`components/common/`)

- Shared across multiple features
- May contain some business logic
- Examples: LoadingScreen, PrivateRoute, ErrorBoundary

### Feature Components (`features/*/components/`)

- Feature-specific components
- Can contain business logic
- Examples: Hero, ProductCard, PricingTable

## 📦 Benefits

1. **Scalability**: Easy to add new features without affecting existing code
2. **Maintainability**: Clear structure makes code easy to find and modify
3. **Collaboration**: Team members can work on isolated features
4. **Testing**: Easier to write unit and integration tests
5. **Code Splitting**: Better support for lazy loading and performance optimization
6. **Discoverability**: Intuitive file locations

## 🔧 Development Workflow

### Import Order Convention

```typescript
// 1. External dependencies
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// 2. Internal aliases (grouped by type)
import { Navbar, Footer } from "@/components/layout";
import { LoadingScreen } from "@/components/common";
import { Hero, Bento } from "@/features/home/components";
import { ROUTES } from "@/constants";
import { formatDate } from "@/utils";
import type { UserProps } from "@/types";

// 3. Relative imports (if any)
import styles from "./styles.module.css";
```

## 🏗️ Industry Standards Followed

This structure follows best practices from:

- **Airbnb**: Feature-based architecture
- **Uber**: Separation of concerns
- **Netflix**: Component organization
- **Vercel**: Modern React patterns

## 📚 Additional Resources

- [React Folder Structure Best Practices](https://www.robinwieruch.de/react-folder-structure/)
- [Feature-Sliced Design](https://feature-sliced.design/)
- [Atomic Design Methodology](https://atomicdesign.bradfrost.com/)
