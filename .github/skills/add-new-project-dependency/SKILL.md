---
name: add-new-project-dependency
description: Decide exactly where a new dependency should be added in this monorepo (root, web, mobile, shared dependencies, or shared peerDependencies), then apply and validate the change consistently.
---

## Purpose

Use this skill whenever adding, moving, or reviewing dependencies in the Ocome monorepo.

Primary goals:

- Keep dependency ownership explicit.
- Avoid hidden transitive/root dependency reliance.
- Prevent duplicate React runtimes.
- Keep workspace metadata and lockfile consistent.

## Monorepo Dependency Policy

### Source of truth

- Workspace packages are defined by `pnpm-workspace.yaml`.
- Root `package.json` `workspaces` field is informational and should stay aligned.

### Ownership rules

- Root `package.json`:
  - Tooling/orchestration only (`turbo`, `typescript`, `eslint`, prettier/test tools).
  - No app runtime dependencies unless truly used by root-level runtime code.
- App package (`apps/web`, `apps/mobile`):
  - Must declare every library imported directly by its source code.
- Shared package (`shared`):
  - Keep implementation/runtime libraries it imports in `dependencies`.
  - Put host-provided libraries in `peerDependencies` when shared should not force its own copy.

### React-specific contract

- Keep React version exact where required by repo policy (currently `19.1.0`).
- Shared package should declare `react` as a `peerDependency`.
- Shared package should declare `react-redux` as a `peerDependency`.
- Apps consuming shared must satisfy shared peerDependencies.

## Decision Matrix

When adding a dependency, pick location by usage:

- Imported only by root scripts/config tooling:
  - Add to root `devDependencies`.
- Imported by `apps/web/src` runtime code:
  - Add to `apps/web/package.json` `dependencies`.
- Imported by `apps/mobile/src` runtime code:
  - Add to `apps/mobile/package.json` `dependencies`.
- Imported by `shared/src` implementation code:
  - Add to `shared/package.json` `dependencies`.
- Required by shared but expected to be provided by apps (single host instance):
  - Add to `shared/package.json` `peerDependencies`.

## Practical Examples

### Example A

`axios` is imported only in `shared/src/redux-store/apis/*`.

Action:

- Add `axios` to `shared` `dependencies`.

### Example B

`react-router-dom` is imported only in web app components.

Action:

- Add `react-router-dom` to `apps/web` `dependencies`.

### Example C

A lint plugin is used only by ESLint config.

Action:

- Add plugin to root `devDependencies`.

### Example D

A library is imported by both web and mobile directly.

Action:

- Add it to both app `dependencies` (do not rely on root).

## Add-Dependency Workflow

1. Find where imports are used (`apps/web/src`, `apps/mobile/src`, `shared/src`).
2. Decide owner using the matrix above.
3. Update the correct `package.json` only.
4. Keep React version exact if touched.
5. Run install and validation.

Recommended commands:

```bash
pnpm install
pnpm --filter @ocome/shared tsc
pnpm --filter @ocome/web tsc
pnpm --filter @ocome/mobile tsc
pnpm lint
```

For final verification in CI-like mode:

```bash
pnpm install --frozen-lockfile
```

## Anti-patterns to avoid

- Adding runtime deps to root so apps can "inherit" them.
- Leaving direct imports undeclared in an app/package.
- Moving React out of app ownership when app directly imports React APIs.
- Changing exact React pin to a range unless explicitly requested.

## Quick Checklist

- [ ] Dependency owner matches import location.
- [ ] Shared peerDependencies are satisfied by consuming apps.
- [ ] React exact version is preserved where applicable.
- [ ] `pnpm-workspace.yaml` and root `workspaces` remain aligned.
- [ ] `pnpm install --frozen-lockfile` succeeds.
