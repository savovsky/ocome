# Ocome Project Context

**Last Updated:** March 4, 2026

## Project Overview

Multi-platform monorepo with desktop (React + Vite) and mobile (React Native + Expo) applications sharing business logic through a shared package.

---

## Essential Setup Requirements

| Requirement | Version |
| ----------- | ------- |
| Node.js | ≥ 24.0.0 |
| pnpm | 9.4.0 (required, not npm/yarn) |
| Turborepo | 1.10.0+ |

---

## Repository Structure

```text
ocome/
├── apps/web/           # React + Vite desktop app
├── apps/mobile/        # React Native + Expo mobile app
├── shared/             # Shared code, Redux store, types
├── .github/
│   ├── context.md      # This file - project context
│   ├── workflows/      # CI/CD pipelines
│   └── instructions/   # Detailed guides
├── docs/architecture/  # Architecture decision records
└── [config files]      # turbo.json, tsconfig.json, eslint.config.js, etc.
```

---

## Quick Commands

### Initial Setup

```bash
pnpm install                # First-time dependency installation
pnpm tsc                    # Type check all packages
pnpm lint                   # Lint all packages
```

### Development

```bash
pnpm dev:web                # Start web dev server (Vite)
pnpm dev:mobile             # Start mobile dev server (Expo)
```

### Pre-Commit Quality Check

```bash
pnpm lint && pnpm tsc && pnpm test
```

### Building

```bash
pnpm build                  # Build all packages
pnpm build:web              # Build web only
pnpm build:mobile           # Build mobile only
```

### Filter Commands (Run Specific Package)

```bash
pnpm --filter web <command>
pnpm --filter mobile <command>
pnpm --filter "./shared" <command>
```

---

## Technology Stack

| Component | Technology |
| --------- | ---------- |
| **Web App** | React 19.1.0 + Vite 7.3.1+ |
| **Mobile App** | React Native + Expo 54.0.33+ |
| **State Management** | Redux Toolkit 2.11.2+ + redux-persist |
| **Language** | TypeScript 5.9.2+ (strict mode) |
| **Code Quality** | ESLint 9.39.3+ + Prettier 3.5.3+ |
| **Build Orchestration** | Turborepo 1.10.0+ |
| **Testing** | Vitest 4.0.18+ |

---

## Key Architecture Decisions

- **Monorepo:** Single repository for coordinated changes, shared dependencies
- **pnpm Workspaces:** Fast, strict dependency management with native workspace support
- **Turborepo:** Smart caching & change detection - only rebuilds affected packages
- **Independent Versioning:** Web & mobile apps have separate version numbers
- **No Shared UI:** Web (React) and Mobile (React Native) have platform-specific implementations
- **Shared Logic:** Business logic, state management, types, utilities in `shared/` package

---

## Shared Package Exports

```typescript
// Redux store
import { store, useStoreDispatch, useStoreSelector } from '@ocome/shared/redux-store'
import type { RootState } from '@ocome/shared/redux-store'

// Types
import type { ModalKeys } from '@ocome/shared/types/modals'

// Constants
import { MODALS_KEYS } from '@ocome/shared/keys/keysModals'
```

---

## Instruction Files Reference

Start with these when you need specific information:

| File | Purpose |
| ---- | ------- |
| [instructions/repo-structure.instructions.md](instructions/repo-structure.instructions.md) | Repository structure overview & quick reference |
| [instructions/development-workflow.instructions.md](instructions/development-workflow.instructions.md) | Commands, Turborepo pipeline, dependency management |
| [instructions/redux-state-management.instructions.md](instructions/redux-state-management.instructions.md) | Redux store setup, hooks, RTK Query, patterns |
| [instructions/ci-cd-workflows.instructions.md](instructions/ci-cd-workflows.instructions.md) | GitHub Actions workflows, branch strategy, debugging |
| [instructions/typescript-configuration.instructions.md](instructions/typescript-configuration.instructions.md) | TypeScript setup, project references, path aliases |
| [instructions/code-quality.instructions.md](instructions/code-quality.instructions.md) | ESLint rules, Prettier formatting, type checking |
| [instructions/troubleshooting.instructions.md](instructions/troubleshooting.instructions.md) | Common issues, installation problems, debugging |

## Skills Reference

Use these reusable skills for recurring implementation patterns:

| Skill | Purpose |
| ----- | ------- |
| [skills/add-new-project-dependency/SKILL.md](skills/add-new-project-dependency/SKILL.md) | Decides exact dependency ownership (root/web/mobile/shared/peerDependencies) and validation workflow |
| [skills/create-update-md-file/SKILL.md](skills/create-update-md-file/SKILL.md) | Ensures markdown files follow markdownlint formatting and structure rules |

---

## Quick Start Checklist

- [ ] `pnpm install` - Install all dependencies
- [ ] `pnpm tsc` - Verify TypeScript configuration
- [ ] `pnpm lint` - Check code quality
- [ ] `pnpm dev:web` OR `pnpm dev:mobile` - Start development
- [ ] Open dev server in browser (web) or Expo app (mobile)

---

## CI/CD Pipelines

Automated checks run on every commit (GitHub Actions):

- **ci-web.yml** - Runs on web app changes: tsc, lint, build
- **ci-mobile.yml** - Runs on mobile app changes: tsc, lint
- **ci-shared.yml** - Runs on shared package changes: tsc, lint

All checks must pass before merging to `main` or `develop`.

---

## Important Notes

- **Always use pnpm** - Not npm or yarn (enforced by script compatibility)
- **pnpm-lock.yaml is sacred** - Commit this file, don't delete it
- **Rebuild on shared changes** - When `shared/` is modified, dependent apps rebuild automatically
- **TypeScript strict mode** - All code must pass strict type checking
- **ESLint before commit** - Run `pnpm lint:fix` to auto-fix most issues

---

## Helpful Resources

- Architecture Decision Records: [../docs/architecture/ADR-001-monorepo-structure.md](../docs/architecture/ADR-001-monorepo-structure.md)
- Main README: [../README.md](../README.md)
- TypeScript Structure Guide: [../docs/tsconfig-structure.md](../docs/tsconfig-structure.md)

---

## Need Help?

1. **Quick commands?** → Check `development-workflow.instructions.md`
2. **Something broken?** → Check `troubleshooting.instructions.md`
3. **Implementing features?** → Check relevant guide (Redux, TypeScript, Code Quality)
4. **Understanding setup?** → Start with `repo-structure.instructions.md`
5. **CI/CD issues?** → Check `ci-cd-workflows.instructions.md`
