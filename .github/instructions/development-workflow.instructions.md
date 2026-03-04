# Development Workflow Instructions

Use this as the default execution policy for AI coding tasks.

## Command Policy

- Prefer root scripts first:
  - `pnpm dev:web`
  - `pnpm dev:mobile`
  - `pnpm build`
  - `pnpm lint`
  - `pnpm tsc`
  - `pnpm test`
- Use filtered commands for package-scoped work:
  - `pnpm --filter web <command>`
  - `pnpm --filter mobile <command>`
  - `pnpm --filter "./shared" <command>`

## AI Task Sequence

1. Inspect target scope.
2. Apply minimal change.
3. Run focused validation.
4. Run broader checks only when needed.

## Validation Defaults

- App-only edits: run `tsc` and `lint` for that app.
- Shared edits: run `./shared` checks first, then affected apps.
- If build-related code changed, run package build.

## When to Load Skills

- Dependency ownership: `../skills/add-new-project-dependency/SKILL.md`
- CI/pipeline updates: `../skills/ci-cd-workflows/SKILL.md`
- Debugging incidents: `../skills/troubleshooting/SKILL.md`
