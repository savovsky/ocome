# Ocome - Communities Management App

A monorepo containing desktop (React + Vite) and mobile (React Native + Expo) applications for communities management.

## 📦 Project Structure

This is a **monorepo** using `pnpm` workspaces and `Turborepo` for build orchestration.

```text
ocome/
├── apps/
│   ├── web/                   # Desktop SPA (React + Vite) → v1.0.0+
│   └── mobile/                # Mobile app (React Native + Expo) → v1.0.0+
├── packages/                  # Shared libraries
│   ├── shared/                # Cross-platform utilities
│   ├── types/                 # Shared TypeScript types
│   └── api/                   # Unified API client
├── docs/architecture/         # Architecture decision records
├── .github/workflows/         # CI/CD pipelines
└── [config files]
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+
- **pnpm** 8+ (`npm install -g pnpm`)

### Installation

```bash
# Install dependencies
pnpm install

# Development servers
pnpm dev:web    # http://localhost:3000
pnpm dev:mobile # Expo CLI

# Or run simultaneously
pnpm dev:web & pnpm dev:mobile
```

### Building

```bash
# Build all apps
pnpm build

# Build specific app
pnpm build:web
pnpm build:mobile

# With Turborepo caching
pnpm turbo run build
```

### Quality Checks

```bash
# Lint all code
pnpm lint

# Type check
pnpm type-check

# Run tests
pnpm test
```

## 📱 Applications

### Web App (`apps/web/`)

- **Framework:** React 18 + Vite
- **Package:** `@ocome/web`
- **Port:** 3000 (dev)
- **Build output:** `dist/`
- **Deployment:** Self-hosted (VPS, Docker, etc.)

### Mobile App (`apps/mobile/`)

- **Framework:** React Native + Expo
- **Package:** `@ocome/mobile`
- **Deployment:** App Store + Google Play Store (via Expo EAS)

## 📚 Shared Packages

| Package | Purpose | Exports |
|---------|---------|---------|

| `@ocome/types` | TypeScript interfaces & types | API responses, User, etc. |
| `@ocome/shared` | Utilities & helpers | `formatDate()`, `debounce()`, etc. |
| `@ocome/api` | API client | `ApiClient` class |

**Usage in apps:**

```typescript
import { formatDate } from '@ocome/shared'
import { ApiClient } from '@ocome/api'
import type { User } from '@ocome/types'
```

## 🔄 Release Process

### Independent Versioning

Web and mobile are **versioned independently**:

- Web: `v1.0.0`, `v1.1.0`, `v2.0.0` (own schedule)
- Mobile: `v1.0.0`, `v1.0.1`, `v1.1.0` (own schedule)

GitHub tags: `web-v1.0.0`, `mobile-v1.0.0` (no conflicts)

### Manual Releases

Both apps use **manual dispatch** for releases:

1. **Web Release:**
   - Go to: GitHub Actions → `Release - Web` → "Run workflow"
   - Enter version (e.g., `1.0.0`)
   - Automatically builds, tags, releases, and deploys

2. **Mobile Release:**
   - Go to: GitHub Actions → `Release - Mobile` → "Run workflow"
   - Enter version (e.g., `1.0.0`)
   - Automatically builds, tags, releases
   - (EAS deployment can be configured)

### CI/CD Workflows

| Workflow | Trigger | Purpose |
|----------|---------|---------|

| `ci-web.yml` | Push/PR to main/develop | Tests & builds web |
| `ci-mobile.yml` | Push/PR to main/develop | Tests mobile |
| `ci-shared.yml` | Changes to packages/ | Tests shared code |
| `release-web.yml` | Manual dispatch | Releases web app |
| `release-mobile.yml` | Manual dispatch | Releases mobile app |

## 📖 Architecture

See [Architecture Decision Record](docs/architecture/ADR-001-monorepo-structure.md) for:

- Why monorepo structure
- Why pnpm + Turborepo
- Release strategy reasoning
- Shared code philosophy
- Future considerations

## 🛠️ Development Guidelines

### Adding new code

**Shared utility?** → `packages/shared/src/`  
**Shared type?** → `packages/types/src/`  
**API logic?** → `packages/api/src/`  
**Web feature?** → `apps/web/src/`  
**Mobile feature?** → `apps/mobile/src/`

### Dependency rules

```text
✅ web/web → shared, types, api, npm:*
✅ mobile → shared, types, api, npm:*
✅ shared → types, npm:*
✅ api → types, npm:*
✅ types → npm:* (no local deps)

❌ Don't import between web/mobile
❌ Don't import web/mobile in shared packages
```

### Turborepo caching

Changes to `packages/` may trigger rebuilds of dependent apps:

```bash
# Only builds web if web/ or packages/ changed
pnpm turbo run build --filter=web
```

## 🔧 Environment Variables

### Web App (`.env.local`)

```text
VITE_API_URL=http://localhost:3001
```

### Mobile (`.env.local`)

```text
EXPO_PUBLIC_API_URL=http://localhost:3001
```

## 📝 Scripts Reference

```bash
# Root level commands
pnpm install              # Install all dependencies
pnpm dev:web              # Start web dev server
pnpm dev:mobile           # Start mobile dev
pnpm build                # Build all (web + mobile)
pnpm build:web            # Build web only
pnpm build:mobile         # Build mobile only
pnpm lint                 # Lint all code
pnpm type-check           # Type check everything
pnpm test                 # Run all tests

# App-specific
pnpm --filter web dev     # Run web dev server
pnpm --filter mobile dev  # Run mobile dev server
pnpm turbo run build      # Build with Turborepo caching
```

## 🤝 Contributing

1. Create a branch: `git checkout -b feature/my-feature`
2. Make changes (respect code splitting guidelines)
3. Type check: `pnpm type-check`
4. Lint: `pnpm lint`
5. Commit: `git commit -m "feat: my feature"`
6. Push: `git push origin feature/my-feature`
7. Create PR to `main` or `develop`

## 📖 Further Reading

- [pnpm Workspaces](https://pnpm.io/workspaces)
- [Turborepo Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [React + Vite](https://vitejs.dev/guide/#trying-vite-online)
- [Expo Documentation](https://docs.expo.dev/)

---

**Last Updated:** February 25, 2026
