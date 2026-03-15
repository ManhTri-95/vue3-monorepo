# AGENTS.md

This file provides guidance to Copilot Code (github-copilot/code) when working with code in this repository.

## Tech Stack & Core Dependencies
- **Architecture:** Monorepo (pnpm workspaces + Turborepo).
- **Frontend:** Vue 3, TypeScript, Vite.
- **UI Framework:** Element Plus + TailwindCSS.
- **Tooling:** Prettier, ESLint, Stylelint, Vitest, vue-tsc.
- **Requirements:** Node ≥ 20.19.0, pnpm ≥ 10.

# AGENTS.md: Project Architecture Knowledge Base

## 1. Directory Structure

- `/apps/`: Applications (visitor, agency, manager_v1)
- `/packages/`: Shared libraries (_core, effects, stores, request, ui-kit)
- `/internal/`: Tooling & Configs
- `/scripts/`: CLI utilities

## 2. Core Architectural Concepts
- **App Lifecycle:** Entry point at `src/bootstrap.ts` (Sequence: i18n → Pinia → Access → Router).
- **Access Control (`@manhtri/access`):** Supports `frontend`, `backend`, and `mixed` modes. Use `v-access` and `<AccessControl>`.
- **Request Client (`@manhtri/request`):** Axios-based client with centralized interceptors for Token, Response deserialization, and Error handling.

## 3. API & Data Flow
- All API requests must use `requestClient` from `#/api/request`.
- No UI logic inside `src/api/` files.
- Use `schemas/` for data validation and type definitions.

## 4. Development Tasks & Maintenance
- **Turbo Pipeline:** Follow `dependsOn: ["^build"]`.
- **Checkers:** - `pnpm check:circular`: Validate dependency graphs.
  - `pnpm check:dep`: Analyze package dependencies.
- **Cleanup:** `pnpm clean` (wipe dist) / `pnpm reinstall` (refresh workspace).

## 5. Coding Conventions
- **Naming:** - Components: `kebab-case`
    - Composables: `use-<feature>.ts`
    - Schemas: `feature.schema.ts`