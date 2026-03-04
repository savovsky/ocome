# Ocome Project Context

**Last Updated:** March 4, 2026

## Project Snapshot

Monorepo with web (`@ocome/web`), mobile (`@ocome/mobile`), and shared package (`@ocome/shared`).

## Environment

| Requirement | Version |
| ----------- | ------- |
| Node.js | `>=24.0.0` |
| pnpm | `9.4.0` |
| Turborepo | `^1.10.0` |

## Quick Commands

```bash
pnpm install
pnpm dev:web
pnpm dev:mobile
pnpm lint
pnpm tsc
pnpm test
pnpm build
```

## AI Context Strategy

- Keep instruction files short (always-on).
- Put procedural, infrequent, or deep workflows in skills.
- Load only the skill needed for the current task.
- Quick explainer in README: [AI Guidance Quick Rule](../README.md#ai-guidance-quick-rule)

## Instructions

| File | Scope |
| ---- | ----- |
| [instructions/repo-structure.instructions.md](instructions/repo-structure.instructions.md) | Architecture invariants and repo boundaries |
| [instructions/development-workflow.instructions.md](instructions/development-workflow.instructions.md) | Command policy and validation sequence |
| [instructions/typescript-configuration.instructions.md](instructions/typescript-configuration.instructions.md) | TS aliases and strictness invariants |
| [instructions/code-quality.instructions.md](instructions/code-quality.instructions.md) | Lint/type quality guardrails |
| [instructions/redux-state-management.instructions.md](instructions/redux-state-management.instructions.md) | Always-on Redux constraints |
| [instructions/ci-cd-workflows.instructions.md](instructions/ci-cd-workflows.instructions.md) | Always-on CI guardrails |
| [instructions/troubleshooting.instructions.md](instructions/troubleshooting.instructions.md) | Always-on triage policy |

## Skills

| Skill | Purpose |
| ----- | ------- |
| [skills/add-new-project-dependency/SKILL.md](skills/add-new-project-dependency/SKILL.md) | Dependency ownership and validation |
| [skills/create-update-md-file/SKILL.md](skills/create-update-md-file/SKILL.md) | Markdownlint-compliant docs editing |
| [skills/ci-cd-workflows/SKILL.md](skills/ci-cd-workflows/SKILL.md) | Detailed CI workflows, triggers, and failure triage |
| [skills/redux-state-management/SKILL.md](skills/redux-state-management/SKILL.md) | Slice/API/persist implementation playbook |
| [skills/troubleshooting/SKILL.md](skills/troubleshooting/SKILL.md) | Stepwise debugging and recovery patterns |
