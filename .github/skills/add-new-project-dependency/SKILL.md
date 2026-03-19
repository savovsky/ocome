---
name: add-new-project-dependency
description: Decide where dependencies belong in this monorepo (root/web/mobile/shared/peerDependencies), apply changes, and validate safely.
---

## Use When

- Adding, moving, or reviewing dependencies.
- Fixing runtime import errors caused by missing ownership.
- Preventing root-level transitive dependency leaks.

## Ownership Matrix

- Root `package.json` `devDependencies`: tooling only (build/lint/test/config).
- `apps/web/package.json`: libraries imported by web app source.
- `apps/mobile/package.json`: libraries imported by mobile app source.
- `packages/shared/package.json` `dependencies`: runtime libs imported by shared implementation.
- `packages/shared/package.json` `peerDependencies`: host-provided libs (e.g., `react`, `react-redux`).

## Repo-Specific Rules

- Keep React pinned as configured (`19.1.0`) where touched.
- Do not rely on root runtime dependencies for app/shared source imports.
- Preserve workspace references (`@ocome/shared`: `workspace:*`).

## Procedure

1. Identify actual import location(s).
2. Choose owner with the matrix.
3. Update only relevant `package.json` file(s).
4. Install and validate affected package(s).

## Validation Commands

```bash
pnpm install
pnpm --filter "./packages/shared" tsc
pnpm --filter web tsc
pnpm --filter mobile tsc
pnpm lint
```
