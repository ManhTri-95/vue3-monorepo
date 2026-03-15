# Frontend Development Guide

This guide establishes the coding standards, patterns, and architectural expectations for frontend development in this project.

## 1. Vue Component Patterns
- **Script Setup:** All components must use `<script setup lang="ts">`.
- **Component Responsibility:** Components are strictly for UI rendering and visual interaction.
- **Business Logic:** Must be extracted into `composables/`. Keep the `<script>` block clean and focused on prop/emit handling.

## 2. Feature-Based Architecture
All features must strictly follow this directory structure:
```text
views/<feature>/
├── components/    # Presentational components (kebab-case)
├── composables/   # Business logic (use-<feature>.ts)
├── schemas/       # Zod schemas & TS interfaces (feature.schema.ts)
├── index.vue      # List page (Table/Filters)
├── detail.vue     # Detail page
└── create.vue     # Form page (Create/Edit)