# Troubleshooting Instructions

Use this as a lightweight triage policy; load the troubleshooting skill for full playbooks.

## Fast Triage Order

1. Reproduce with package-scoped command.
2. Confirm versions (`node`, `pnpm`) and install health.
3. Validate TypeScript and lint in affected package.
4. Escalate to broader cache/reset steps only if needed.

## Safety Rules

- Prefer least-destructive fixes first.
- Do not delete lockfiles or large directories unless necessary.
- Keep debugging actions scoped to the failing package.

## Deep Playbook

- Use `../skills/troubleshooting/SKILL.md` for issue-specific commands (dev server, module resolution, cache, Redux, CI drift).
