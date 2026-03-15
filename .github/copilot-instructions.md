# GitHub Copilot Instructions - Project Standards

## 1. Project Overview & Architecture
This is a **Vue 3 monorepo** using **TypeScript**, **Vite**, **pnpm workspace**, and **Turborepo**.

AI assistants must follow these architectural guidelines:
- **Monorepo Hierarchy:** `apps/` (applications), `packages/` (shared libraries), `internal/` (local helpers).
- **Dependency Rule:** Apps may import packages. Packages must **NOT** import apps.
- **Shared Logic:** Always place shared logic in `packages/`. Do not duplicate code.
- **Reference Files:** Always consult the following for specific rules:
    - `AGENTS.md`: Persona and communication style.
    - `docs/architecture.md`: System-wide architectural constraints.
    - `docs/frontend-guide.md`: UI/UX implementation and library patterns.

## 2. Feature Structure (Mandatory)
All feature modules must be located in `src/views/<feature>/`.
**Prohibited folders:** `modules/`, `features/`, `containers/`.

**Required structure per feature:**
```text
views/<feature>/
├── components/    # UI partials (Naming: kebab-case)
├── composables/   # Business logic (Naming: use-<feature>.ts)
├── schemas/       # Zod schemas & TS interfaces (Naming: feature.schema.ts)
├── index.vue      # List page (Table/Filters/Pagination)
├── detail.vue     # Detail page
└── create.vue     # Form page (Create/Edit)