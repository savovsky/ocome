---
name: troubleshooting
description: Diagnose and resolve common monorepo issues with a least-destructive, package-scoped workflow.
---

## Use When

- Build/lint/tsc/dev server commands fail.
- Module resolution/import alias issues appear.
- CI passes locally but fails remotely (or vice versa).

## Triage Workflow

1. Reproduce with the smallest package-scoped command.
2. Confirm environment:
   - `node --version`
   - `pnpm --version`
3. Run package checks (`tsc`, `lint`).
4. If unresolved, clear targeted caches.
5. Use full reinstall only as a last resort.

## Common Commands

```bash
pnpm --filter web tsc
pnpm --filter web lint
pnpm --filter mobile tsc
pnpm --filter mobile lint
pnpm --filter "./packages/shared" tsc
pnpm --filter "./packages/shared" lint
```

## Escalation Steps

- Restart failing dev server.
- Restart TypeScript server in editor.
- Clear `.turbo` cache if build graph appears stale.
- Reinstall dependencies if lockfile/install state is inconsistent.

## Guardrails

- Avoid destructive resets unless prior steps fail.
- Keep diagnosis scoped to changed package(s).
- Record root cause and fix in PR notes when possible.
