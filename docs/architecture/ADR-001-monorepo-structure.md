# Architecture Decision Record (ADR) - Ocome Project Monorepo Structure

**Date:** February 25, 2026  
**Author:** AI Assistant  
**Status:** Accepted  

## 1. Context & Problem Statement

Ocome project requires parallel development of two separate applications:

- **Web App:** Desktop SPA using React + Vite
- **Mobile App:** Mobile application using React Native + Expo

Both applications share common api, business logic, types, and utilities. The challenge is managing code sharing while maintaining:

- Independent version control for each application
- Separate release cycles (web and mobile can be released at different times)
- Efficient development and build processes
- Clear code ownership and responsibility

## 2. Decision: Monorepo with pnpm + Turborepo

We have chosen to implement a **monorepo** structure using:

- **Package Manager:** pnpm (with workspaces)
- **Build Orchestration:** Turborepo
- **CI/CD Platform:** GitHub Actions

### Why Monorepo?

✅ **Benefits:**

- Single source of truth for shared code
- Easier refactoring across apps and packages
- Simplified dependency management
- Atomic commits for coordinated changes
- One repository to clone, one CI/CD pipeline

### Why pnpm?

✅ **pnpm vs alternatives:**

- **Faster:** Better disk usage with hard-link-based approach
- **Strict:** Enforces proper dependency declarations
- **Lightweight:** Smaller lockfile (pnpm-lock.yaml)
- **Workspace support:** Native monorepo capabilities

### Why Turborepo?

✅ **Build Orchestration Benefits:**

- **Change detection:** Only builds affected packages/apps
- **Caching:** Avoids rebuilding unchanged code
- **Parallelization:** Runs independent tasks simultaneously
- **Task dependencies:** Respects `dependsOn` graph
- **Developer experience:** Simple configuration in `turbo.json`

## 3. Directory Structure

```text
ocome/
├── apps/
│   ├── web/                    # React + Vite desktop app (independent version)
│   └── mobile/                 # React Native + Expo mobile app (independent version)
├── packages/
│   ├── shared/                 # Cross-platform utilities & hooks
│   ├── types/                  # Shared TypeScript interfaces
│   └── api/                    # Unified API client (fetch-based)
├── .github/
│   └── workflows/              # CI/CD pipelines
├── docs/
│   └── architecture/           # Architecture documentation (this file)
├── package.json                # Root workspace config
├── pnpm-workspace.yaml         # Workspace declaration
├── turbo.json                  # Turborepo configuration
├── tsconfig.json               # Root TypeScript config
└── .npmrc                      # pnpm configuration
```

### Key Design Decisions

#### **Separate `apps/` for applications**

- Each app manages its own version number independently
- Clear separation between deployable applications and libraries
- Easy to identify what gets deployed vs. what's internal

#### **Unified `packages/` for shared code**

- `shared/` → Utilities, helpers, validation logic (platform-agnostic)
- `types/` → TypeScript interfaces and domain models
- `api/` → Unified API client using standard Fetch API

#### **NO shared UI components**

- Web uses React (JSX in DOM)
- Mobile uses React Native (native components)
- These cannot be easily shared; UI implementation is platform-specific

## 4. Release Strategy: Independent Versions

**Decision:** Each application manages its own version independently.

### Why Independent Versions?

✅ **Rationale:**

- **Different release schedules:** Web might iterate faster than mobile
- **Different deployment pipelines:** Web (self-hosted), Mobile (App Store/Play Store)
- **Different dependency matrices:** May require different library versions
- **Clear accountability:** Version number reflects app state directly

### Version Management

```text
web:        v2.1.0
mobile:     v1.8.3
shared:     internal only (not versioned externally)
```

**GitHub Release Tags:**

- Web releases: `web-v2.1.0`, `web-v2.1.1`, etc.
- Mobile releases: `mobile-v1.8.3`, `mobile-v1.9.0`, etc.
- Prevents tag conflicts between app releases

## 5. CI/CD Strategy: GitHub Actions with Manual Dispatch

**Decision:** Use GitHub Actions with manual `workflow_dispatch` for releases.

### Why Manual Dispatch?

✅ **Benefits:**

- **Explicit control:** Developer decides exactly when to release
- **No auto-release surprises:** Avoids accidental deployments
- **Clear audit trail:** Every release is intentional and documented
- **Flexible:** Can release web while holding mobile, or vice versa

### Workflow Structure

```text
.github/workflows/
├── ci-web.yml          → Runs on push/PR to main/develop
├── ci-mobile.yml       → Runs on push/PR to main/develop
├── ci-shared.yml       → Runs when shared packages change
├── release-web.yml     → Manual dispatch: `pnpm release:web --version=X.Y.Z`
└── release-mobile.yml  → Manual dispatch: `pnpm release:mobile --version=X.Y.Z`
```

### Release Flow

1. Developer manually triggers `release-web.yml` with version input
2. GitHub Actions:
   - ✓ Type-checks and lints code
   - ✓ Builds production bundle
   - ✓ Updates `package.json` version
   - ✓ Creates git tag and commit
   - ✓ Pushes to remote
   - ✓ Creates GitHub Release
   - ✓ Deploys to production (custom script)
3. Mobile release follows same pattern independently

## 6. Deployment Targets

**Web App:**

- Self-hosted deployment (VPS, Docker, etc.)
- Deployment script hooks available in release workflows

**Mobile App:**

- Expo EAS Build (for iOS/Android builds)
- App Store + Google Play Store distribution
- Placeholder in workflows for EAS integration

## 7. Shared Code Strategy

### What Gets Shared?

✅ **Shareable:**

- Type definitions (`packages/types`)
- Validation logic
- Utility functions
- API client interface
- Constants and configuration

❌ **NOT Shared:**

- UI Components (platform-specific rendering)
- Styling (DOM vs. React Native)
- Device-specific APIs (Camera, Location handled per-platform)

### Package Dependencies

```json
web depends on:
  └─ shared
  └─ types
  └─ api

mobile depends on:
  └─ shared
  └─ types
  └─ api

shared depends on:
  └─ types

api depends on:
  └─ types

types depends on:
  (nothing)
```

### Dependency Management Strategy

**TypeScript & DevDependencies:**

Internal packages (`packages/*`) **do not** declare TypeScript or shared devDependencies in their individual `package.json` files. These are managed at the **root level only**.

✅ **Root-level devDependencies:**

- `typescript` - Single version for entire monorepo
- `eslint` + plugins - Shared linting configuration
- `prettier` - Consistent code formatting
- `turbo` - Build orchestration

✅ **Package-level dependencies:**

- Only **runtime dependencies** specific to that package
- Examples: `zod` for validation, `date-fns` for utilities
- Workspace dependencies: `@ocome/types`, `@ocome/api`, etc.

**Why this approach?**

- ✅ **pnpm workspace hoisting:** Shared dependencies automatically available
- ✅ **Version consistency:** No conflicts between packages
- ✅ **Simpler maintenance:** Update TypeScript once, affects all packages
- ✅ **Faster installs:** Less duplication in node_modules

**Exception:** Apps (`apps/*`) may declare their own TypeScript version if they need framework-specific versions (e.g., React Native compatibility).

## 8. Development Workflow

### Initial Setup

```bash
pnpm install
pnpm dev:web   # Run web dev server
pnpm dev:mobile # Run mobile dev server
```

### Building

```bash
pnpm build        # Build everything (web + mobile + packages)
pnpm build:web    # Build web only
pnpm build:mobile # Build mobile only
```

### Releasing

- To release web: Go to GitHub Actions → `Release - Web` → Run with version
- To release mobile: Go to GitHub Actions → `Release - Mobile` → Run with version

## 9. Benefits & Trade-offs

### ✅ Benefits

- **Code reuse:** Shared types, utilities, API client
- **Atomic commits:** Related changes committed together
- **Single build system:** Turborepo handles complexity
- **Clear deployment model:** Each app independently releasable
- **Scalability:** Easy to add more packages or apps
- **Type safety:** Unified TypeScript configuration

### ⚠️ Trade-offs

- **Monorepo complexity:** Must be careful with dependencies
- **CI/CD setup:** More configuration (but paid back in clarity)
- **Performance:** Large workspace can be slower on first load
- **Discipline needed:** Shared code requires careful design

## 10. Future Considerations

- **Package versioning:** Currently shared packages not published; can add publishing later
- **Micro-frontends:** Can split further if needed
- **Shared E2E tests:** Could use Playwright/Cypress for both apps
- **Design system:** Could create `packages/ui` if UI patterns emerge
- **Monorepo tooling:** Could migrate to Nx if complexity grows

## 11. Decision Alternatives Considered

### Option A: Separate Repositories (Rejected)

- ❌ Duplicated shared code
- ❌ Harder to refactor shared logic
- ❌ Dependency version mismatches

### Option B: Monorepo with npm workspaces (Not recommended)

- Works but slower than pnpm
- Less strict dependency management
- Would still use Turborepo anyway

### Option C: Monorepo without Turborepo (Simpler but not recommended)

- ❌ Manual task management
- ❌ No automatic caching
- ❌ Slower developer experience

## 12. References & Further Reading

- [pnpm Documentation](https://pnpm.io/)
- [Turborepo Documentation](https://turbo.build/)
- [React Vite Setup](https://vitejs.dev/guide/#trying-vite-online)
- [Expo Documentation](https://docs.expo.dev/)
- [Monorepo Best Practices](https://turbo.build/repo/docs/getting-started)

## 13. Governance

**Architecture Owner:** [TBD]  
**Last Updated:** February 25, 2026  
**Review Cycle:** Annually or when significant changes occur

### How to Propose Changes

1. Create an issue describing the architectural concern
2. Reference this ADR document
3. Propose alternative(s) and reasoning
4. Get consensus from team
5. Update this document with decision

---

## Appendix: Quick Commands

```bash
# Development
pnpm install             # Install dependencies
pnpm dev:web             # Start web dev server
pnpm dev:mobile          # Start mobile dev server

# Building
pnpm build               # Build all
pnpm build:web           # Build web only
pnpm build:mobile        # Build mobile only
pnpm turbo run build     # Full Turborepo build with caching

# Quality checks
pnpm lint                # Lint all packages
pnpm test                # Run all tests
pnpm type-check          # Type check all packages

# Releases
# Go to GitHub Actions → Release - Web/Mobile → "Run workflow"
# Input version in format: X.Y.Z or X.Y.Z-alpha.N
```
