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
  - `pnpm --filter "./packages/shared" <command>`

## AI Task Sequence

1. Inspect target scope.
2. Apply minimal change.
3. Run focused validation.
4. Run broader checks only when needed.

## Validation Defaults

- App-only edits: run `tsc` and `lint` for that app.
- Shared edits: run `./packages/shared` checks first, then affected apps.
- If build-related code changed, run package build.

## Post-Task Quality Gate (mandatory)

After **every** completed task — regardless of size — run the project checks for all affected packages before presenting results:

1. **Lint**: `pnpm --filter <pkg> lint` for each changed package
2. **Type-check**: `pnpm --filter <pkg> tsc` for each changed package

If either check fails, fix the errors before presenting. Do not show the result to the user with failing lint or tsc.

Use `pnpm lint` and `pnpm tsc` at the root when changes span multiple packages or the affected scope is unclear.

## When to Load Skills

- Dependency ownership: `../skills/add-new-project-dependency/SKILL.md`
- CI/pipeline updates: `../skills/ci-cd-workflows/SKILL.md`
- Debugging incidents: `../skills/troubleshooting/SKILL.md`

## Prompt Workflows

- Treat `.github/prompts/*.prompt.md` as binding workflow definitions when explicitly invoked.
- For `git-ship`, only trigger the flow on exact invocation: `/git-ship` or `git-ship`.
- Do not use fuzzy matching for trigger phrases such as "ship this".
- Execute prompt steps in strict order; do not skip, merge, or reorder gates.
- For approval gates, wait for explicit user confirmation before continuing.
- For `git-ship` quality checks, if `pnpm lint` or `pnpm tsc` fails, stop immediately and do not offer override.
