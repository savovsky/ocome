# TypeScript Configuration Instructions

Use this file for always-on TypeScript constraints.

## Source of Truth

- Base config and aliases: `tsconfig.base.json`
- Root references: `tsconfig.json`
- App configs: `apps/web/tsconfig*.json`, `apps/mobile/tsconfig.json`
- Shared config: `shared/tsconfig.json`

## Required Invariants

- Keep strict mode compatible.
- Preserve alias contract:
  - `@ocome/shared`
  - `@ocome/shared/*`
- Avoid cross-package relative imports that bypass aliases.

## Validation

- For TS-impacting changes, run:
  - `pnpm --filter web tsc` and/or
  - `pnpm --filter mobile tsc` and/or
  - `pnpm --filter "./shared" tsc`

## Escalate to Skills

- If issue involves complex resolution/debugging, load `../skills/troubleshooting/SKILL.md`.
