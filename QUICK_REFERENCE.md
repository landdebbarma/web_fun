# Quick Reference - Folder Structure

## 📂 Directory Tree

```
AnToAnt_landingPage/
│
├── 📄 Configuration Files
│   ├── package.json
│   ├── tsconfig.json
│   ├── tsconfig.app.json (✨ Updated with path aliases)
│   ├── vite.config.ts (✨ Updated with path aliases)
│   ├── tailwind.config.js
│   └── eslint.config.js
│
├── 📚 Documentation
│   ├── README.md
│   ├── FOLDER_STRUCTURE.md (✨ New)
│   └── MIGRATION_GUIDE.md (✨ New)
│
└── 📁 src/
    │
    ├── 🎯 app/ (✨ New)
    │   ├── providers/
    │   │   ├── AuthProvider.tsx (moved from lib/)
    │   │   └── index.ts
    │   └── routes/
    │
    ├── 🖼️ assets/ (✨ New)
    │   ├── images/
    │   └── icons/
    │
    ├── 🧩 components/
    │   ├── common/ (✨ New)
    │   │   ├── LoadingScreen/
    │   │   │   ├── LoadingScreen.tsx
    │   │   │   └── index.ts
    │   │   └── PrivateRoute/
    │   │       ├── PrivateRoute.tsx
    │   │       └── index.ts
    │   │
    │   ├── layout/ (✨ New)
    │   │   ├── Navbar/
    │   │   │   ├── Navbar.tsx
    │   │   │   └── index.ts
    │   │   ├── Footer/
    │   │   │   ├── Footer.tsx
    │   │   │   └── index.ts
    │   │   └── index.ts
    │   │
    │   └── ui/ (Existing, contains design system components)
    │       ├── Card/
    │       ├── Marquee/
    │       ├── Timeline/
    │       ├── FAQ/
    │       ├── Testimonial/
    │       └── ... (other UI components)
    │
    ├── 🎨 features/ (✨ New - Feature-based architecture)
    │   ├── home/
    │   │   └── components/
    │   │       ├── Hero/
    │   │       │   ├── Hero.tsx
    │   │       │   └── index.ts
    │   │       ├── Bento/
    │   │       │   ├── Bento.tsx
    │   │       │   └── index.ts
    │   │       ├── Product/
    │   │       │   ├── Product.tsx
    │   │       │   └── index.ts
    │   │       ├── CTA/
    │   │       │   ├── CTA.tsx
    │   │       │   └── index.ts
    │   │       └── index.ts
    │   │
    │   ├── pricing/
    │   │   └── components/
    │   │       ├── PricingDemo/
    │   │       │   ├── PricingDemo.tsx
    │   │       │   └── index.ts
    │   │       ├── PricingContainer/
    │   │       │   ├── PricingContainer.tsx
    │   │       │   └── index.ts
    │   │       └── index.ts
    │   │
    │   ├── AnToAnt-ai/
    │   │   └── components/
    │   │       └── AnToAntAi/
    │   │
    │   └── wishlist/
    │       └── components/
    │           └── Wishlist.tsx
    │
    ├── 🪝 hooks/ (✨ New - Custom React hooks)
    │
    ├── 📚 lib/
    │   └── utils.ts
    │
    ├── 📄 pages/ (✨ New - Page components)
    │   └── HomePage.tsx
    │
    ├── 🎨 styles/
    │   ├── index.css
    │   └── globals.css
    │
    ├── 📝 types/ (✨ New - TypeScript types)
    │   ├── components.ts
    │   └── index.ts
    │
    ├── ⚙️ constants/ (✨ New - App constants)
    │   ├── routes.ts
    │   ├── config.ts
    │   └── index.ts
    │
    ├── 🛠️ utils/ (✨ New - Utility functions)
    │
    ├── App.tsx
    └── main.tsx
```

## 🎯 Component Categories

### 1. UI Components (`components/ui/`)

**Purpose**: Atomic, reusable design system components
**Examples**: Button, Card, Input, Modal, Marquee, Timeline
**Characteristics**:

- No business logic
- Highly configurable
- Used across multiple features

### 2. Layout Components (`components/layout/`)

**Purpose**: Page structure and navigation
**Examples**: Navbar, Footer, Sidebar, Header
**Characteristics**:

- Persistent across pages
- Handle navigation
- Contain app-wide UI elements

### 3. Common Components (`components/common/`)

**Purpose**: Shared functionality components
**Examples**: LoadingScreen, PrivateRoute, ErrorBoundary
**Characteristics**:

- Used across multiple features
- May contain business logic
- Not part of design system

### 4. Feature Components (`features/*/components/`)

**Purpose**: Feature-specific components
**Examples**: Hero, ProductCard, PricingTable
**Characteristics**:

- Tied to specific features
- Contain business logic
- Compose UI components

## 🔄 Data Flow

```
User Request
    ↓
Page Component (pages/HomePage.tsx)
    ↓
Feature Components (features/home/components/)
    ↓
UI Components (components/ui/)
    ↓
Render
```

## 📦 Import Examples

### Before (Old Structure)

```typescript
import Navbar from "../../../components/navbar/navbar";
import Hero from "../../components/hero";
import { LoadingScreen } from "../components/ui/loadingScreen";
```

### After (New Structure)

```typescript
import { Navbar } from "@/components/layout";
import { Hero } from "@/features/home/components";
import { LoadingScreen } from "@/components/common";
```

## 🚀 Quick Commands

### Create New Feature

```bash
mkdir -p src/features/my-feature/components/MyComponent
touch src/features/my-feature/components/MyComponent/MyComponent.tsx
touch src/features/my-feature/components/MyComponent/index.ts
```

### Create New UI Component

```bash
mkdir -p src/components/ui/MyUIComponent
touch src/components/ui/MyUIComponent/MyUIComponent.tsx
touch src/components/ui/MyUIComponent/index.ts
```

### Create New Page

```bash
touch src/pages/MyPage.tsx
```

## 🎨 Color Legend

- ✨ **New** - Newly created directories/files
- 📁 **Directory** - Folder
- 📄 **File** - Single file
- 🎯 **App** - Application configuration
- 🧩 **Components** - UI components
- 🎨 **Features** - Feature modules
- 📚 **Library** - Utilities and helpers
- 🪝 **Hooks** - Custom React hooks
- 📝 **Types** - TypeScript definitions
- ⚙️ **Constants** - Configuration constants
- 🛠️ **Utils** - Utility functions
