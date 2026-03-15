# Architecture Overview

This repository utilizes a modular **Monorepo** architecture powered by **Turborepo** and **pnpm workspaces**, designed to scale multiple frontend applications while maintaining high code reusability.

## 1. Monorepo Layout

- **`apps/`**: Contains independent frontend applications (e.g., `visitor`, `agency`, `manager_v1`).
- **`packages/`**: Contains shared libraries (core logic, UI components, utilities).
- **`internal/`**: Shared build configurations (ESLint, Vite, Tailwind, TS).
- **`scripts/`**: CLI tools and automation scripts.

## 2. Dependency Rules
- **Flow:** `Apps` → `Packages` (One-way dependency).
- **Constraint:** Packages must be framework-agnostic (where possible) and **must not** import from `apps/`.
- **Reuse:** Shared logic must be extracted into `packages/` to ensure a "Single Source of Truth."

## 3. Application Architecture (`apps/`)
Each application follows a standardized internal structure:
```text
src/
├── api/        # App-specific API client instances
├── layouts/    # Application layouts
├── locales/    # App-specific i18n
├── router/     # Routing configuration
├── store/      # App-specific state
└── views/      # Feature-based view modules