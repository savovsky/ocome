# Redux State Management Instructions

Use these always-on rules when touching Redux/RTK Query in shared code.

## Location Rules

- Redux store lives under `packages/shared/src/redux-store/`.
- App code consumes shared exports via `@ocome/shared/redux-store`.
- Keep store APIs centralized in shared package.

## Change Rules

- Prefer minimal slice/API updates over broad refactors.
- Keep typed hooks and exports intact.
- Ensure cache invalidation tags remain consistent when editing RTK Query endpoints.

## Validation

- Run `pnpm --filter "./packages/shared" tsc` and `pnpm --filter "./packages/shared" lint`.
- Run app checks for consumers impacted by shared changes.

## Deep Playbook

- For slice patterns, API endpoint patterns, and persist details, load `../skills/redux-state-management/SKILL.md`.
