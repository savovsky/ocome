---
name: ci-cd-workflows
description: Apply and debug GitHub Actions CI workflow changes safely for web, mobile, and shared packages.
---

## Use When

- Editing files in `.github/workflows/`.
- Diagnosing CI failures.
- Aligning local checks with CI behavior.

## Current Workflow Scope

- `ci-web.yml`: web + shared changes, runs tsc/lint/build for web.
- `ci-mobile.yml`: mobile + shared changes, runs tsc/lint for mobile.
- `ci-shared.yml`: shared changes, runs tsc/lint for shared.

## Local Reproduction

```bash
pnpm install --frozen-lockfile
pnpm turbo run tsc --filter=web
pnpm turbo run lint --filter=web
pnpm turbo run build --filter=web

pnpm turbo run tsc --filter=mobile
pnpm turbo run lint --filter=mobile

pnpm turbo run tsc --filter="./packages/shared"
pnpm turbo run lint --filter="./packages/shared"
```

## Safe Change Pattern

1. Keep trigger paths narrow and package-specific.
2. Keep workflow changes minimal and explicit.
3. Validate equivalent local commands before handoff.
4. Document expected CI impact in PR notes.

## Failure Triage

- Install errors: lockfile drift or dependency mismatch.
- TSC errors: alias/export/type regressions.
- Lint errors: rule violations or formatting drift.
- Build errors: web bundling/runtime config issues.
