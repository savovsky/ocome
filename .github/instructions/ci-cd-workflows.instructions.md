# CI/CD Workflows Instructions

Keep this file minimal; load detailed CI procedures from the CI skill only when needed.

## Always-On CI Rules

- Do not modify workflow files unless the task explicitly involves CI/CD.
- Before finishing CI-related changes, run local equivalents of affected checks when feasible.
- Keep workflow updates scoped to changed packages (`web`, `mobile`, `shared`).

## Local Validation Defaults

- Web changes: `pnpm turbo run tsc --filter=web`, `pnpm turbo run lint --filter=web`, `pnpm turbo run build --filter=web`
- Mobile changes: `pnpm turbo run tsc --filter=mobile`, `pnpm turbo run lint --filter=mobile`
- Shared changes: `pnpm turbo run tsc --filter="./packages/shared"`, `pnpm turbo run lint --filter="./packages/shared"`

## Deep Playbook

- For trigger-path rules, branch strategy, failure triage, and release placeholders, load `../skills/ci-cd-workflows/SKILL.md`.
