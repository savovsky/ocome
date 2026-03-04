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
- Do not disable lint rules unless necessary for task scope.
- Preserve existing architecture and naming conventions.
- Keep changes minimal and focused on the request.

## Formatting Rules

- Respect ESLint + Prettier defaults in repo.
- Avoid unrelated formatting churn.

## Escalate to Skills

- Markdown authoring standards: `../skills/create-update-md-file/SKILL.md`
