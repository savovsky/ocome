# Ocome Repository Structure Instructions

Use this file as the always-on, low-token baseline for AI coding work in this repository.

## Core Environment

- Node.js: `>=24.0.0`
- pnpm: `9.4.0` (required)
- Package manager policy: use `pnpm` only

## Monorepo Layout

- `apps/web`: React + Vite app (`@ocome/web`)
- `apps/mobile`: React Native + Expo app (`@ocome/mobile`)
- `shared`: shared logic/state/types (`@ocome/shared`)
- `.github/instructions`: always-on repo guidance
- `.github/skills`: task-specific, on-demand playbooks

## Architecture Invariants

- Apps may import from `@ocome/shared`; `shared` must not import from app code.
- Do not create shared UI across web/mobile unless explicitly requested.
- Keep changes scoped to the user request; avoid unrelated refactors.

## Source of Truth Files

- Workspace: `pnpm-workspace.yaml`
- Pipeline: `turbo.json`
- TS base config/aliases: `tsconfig.base.json`
- Quality config: `eslint.config.js`

## AI Context Policy

- Keep instruction files concise and stable.
- Put procedural or infrequent workflows in skills.
- Prefer loading detailed skills only when the task requires them.
