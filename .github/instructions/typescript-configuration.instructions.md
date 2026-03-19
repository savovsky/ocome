# TypeScript Configuration Instructions

Use this file for always-on TypeScript constraints.

## Source of Truth

- Base config and aliases: `tsconfig.base.json`
- Root references: `tsconfig.json`
- App configs: `apps/web/tsconfig*.json`, `apps/mobile/tsconfig.json`
- Shared config: `packages/shared/tsconfig.json`

## Layering Policy

- Use a layered model, not a single universal app config:
  - `tsconfig.base.json` = cross-project defaults and aliases.
  - `tsconfig.json` and `apps/web/tsconfig.json` = solution/reference coordinators only.
  - `apps/web/tsconfig.web-base.json` = shared Vite/Web compiler defaults.
  - `apps/web/tsconfig.app.json` and `apps/web/tsconfig.node.json` = Vite-specific leaf configs extending the web base.
  - `apps/mobile/tsconfig.json` and `packages/shared/tsconfig.json` = extend base and override as needed.
- Do not force `packages/shared` to use Vite app settings (`types: ["vite/client"]`, browser libs, app-only `baseUrl`).

## Required Invariants

- Keep strict mode compatible.
- Preserve alias contract:
  - `@ocome/shared`
  - `@ocome/shared/*`
- Avoid cross-package relative imports that bypass aliases.
- Keep solution configs (`files: []` + `references`) free of app/library compile options.
- Keep web and mobile JSX/runtime options platform-specific (`react-jsx` vs `react-native`).

## Validation

- For TS-impacting changes, run:
  - `pnpm --filter web tsc` and/or
  - `pnpm --filter mobile tsc` and/or
  - `pnpm --filter "./packages/shared" tsc`

## Escalate to Skills

- If issue involves complex resolution/debugging, load `../skills/troubleshooting/SKILL.md`.
