# Ocome Repository - Structure Instructions

A monorepo with desktop (React + Vite) and mobile (React Native + Expo) apps sharing business logic via a shared package.

### Quick Reference

| Item | Details |
|------|---------|
| Node.js | ≥ 24.0.0 |
| pnpm | 9.4.0 (required) |
| Turborepo | 1.10.0+ |
| Package Manager | pnpm (not npm/yarn) |
| Build Orchestration | Turborepo with smart caching |

---

## Folder Structure

```
ocome/
├── apps/
│   ├── web/           # React + Vite app
│   └── mobile/        # React Native + Expo app
├── shared/            # Shared code, state, types
├── .github/workflows/ # GitHub Actions CI/CD
├── docs/              # Architecture & guides
├── package.json       # Root workspace
├── pnpm-workspace.yaml
├── turbo.json         # Build orchestration
└── tsconfig.base.json # Shared TS config
```

---

## Tech Stack

| Layer | Technologies |
|-------|--------------|
| **Web** | React 19.1.0 + Vite 7.3.1+ |
| **Mobile** | React Native + Expo 54.0.33+ |
| **State** | Redux Toolkit 2.11.2+ + redux-persist |
| **Types** | TypeScript 5.9.2+ (strict mode) |
| **Quality** | ESLint + Prettier |

---

## Key Scripts

```bash
pnpm install          # First-time setup
pnpm dev:web          # Start web dev server
pnpm dev:mobile       # Start mobile dev server
pnpm lint             # Check code quality
pnpm tsc              # Type check all packages
pnpm build            # Production build
```

See [development-workflow.instructions.md](./development-workflow.instructions.md) for complete command reference.

---

## CI/CD Workflows

Automated checks in `.github/workflows/`:
- **ci-web.yml** - Web app (tsc, lint, build)
- **ci-mobile.yml** - Mobile app (tsc, lint)
- **ci-shared.yml** - Shared package (tsc, lint)

See [ci-cd-workflows.instructions.md](./ci-cd-workflows.instructions.md) for details.

---

## TypeScript Configuration

Strict mode enabled with project references for efficient type-checking.

See [typescript-configuration.instructions.md](./typescript-configuration.instructions.md) for setup details.

---

## Code Quality

ESLint + Prettier enforce consistent code style across all packages.

See [code-quality.instructions.md](./code-quality.instructions.md) for rules and guidelines.

---

## Architecture Notes

- **Independent versioning:** Each app has its own version
- **No shared UI:** Web (React) & Mobile (React Native) are separate implementations
- **Shared logic:** Business logic, state, types, and utilities in `shared/` package

---

## Quick Start Checklist

- [ ] `pnpm install` - Install dependencies
- [ ] `pnpm tsc` - Verify types
- [ ] `pnpm lint` - Check code quality
- [ ] `pnpm dev:web` or `pnpm dev:mobile` - Start development

---

## Instruction Files

- [development-workflow.instructions.md](./development-workflow.instructions.md) - Commands & Turborepo details
- [redux-state-management.instructions.md](./redux-state-management.instructions.md) - Redux store & patterns
- [ci-cd-workflows.instructions.md](./ci-cd-workflows.instructions.md) - GitHub Actions pipelines
- [typescript-configuration.instructions.md](./typescript-configuration.instructions.md) - TypeScript setup
- [code-quality.instructions.md](./code-quality.instructions.md) - Linting & formatting
- [troubleshooting.instructions.md](./troubleshooting.instructions.md) - Common issues & solutions