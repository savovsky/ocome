# Code Quality Instructions

Always follow these constraints for code changes.

## Required Checks

- Prefer package-scoped checks first:
  - `pnpm --filter web lint`
  - `pnpm --filter mobile lint`
  - `pnpm --filter "./shared" lint`
  - matching `tsc` command for changed package(s)

## Coding Rules

- Keep TypeScript strict-safe; avoid introducing `any`.
- Keep public exports typed.
- Never disable lint rules and TS checks without explicit permission.
- Preserve existing architecture and naming conventions.
- Keep changes minimal and focused on the request.
- Do not introduce new patterns without prior approval.
- If requirements are unclear, ask for clarification rather than making assumptions.
- If business logic is unclear, ask for clarification rather than making assumptions.

## Formatting Rules

- Respect ESLint + Prettier defaults in repo.
- Avoid unrelated formatting churn.

## Escalate to Skills

- Markdown authoring standards: `../skills/create-update-md-file/SKILL.md`
