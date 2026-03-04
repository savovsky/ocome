# CI/CD Workflows Instructions

## Overview

GitHub Actions workflows in `.github/workflows/` automate testing, linting, type-checking, and builds.

All workflows run on **Ubuntu-latest** with **Node 24** and **pnpm 9.4.0**.

---

## CI Workflows

### CI - Web (`ci-web.yml`)

**Triggered by:**
- Push to `main` or `develop` with changes in:
  - `apps/web/**`
  - `shared/**`
  - `.github/workflows/ci-web.yml`
- Pull requests to `main` or `develop` with above changes

**Jobs:**

1. **test** (runs on all triggers)
   - Installs dependencies (`pnpm install --frozen-lockfile`)
   - Type checks with `pnpm turbo run tsc --filter=web`
   - Lints with `pnpm turbo run lint --filter=web`
   - Builds with `pnpm turbo run build --filter=web`

2. **build** (runs only on `main` branch push, after test passes)
   - Creates production build
   - Uploads artifacts for deployment

**Status Checks:** Must pass before merging

---

### CI - Mobile (`ci-mobile.yml`)

**Triggered by:**
- Push to `main` or `develop` with changes in:
  - `apps/mobile/**`
  - `shared/**`
  - `.github/workflows/ci-mobile.yml`
- Pull requests to `main` or `develop` with above changes

**Jobs:**

1. **test** (runs on all triggers)
   - Installs dependencies
   - Type checks with `pnpm turbo run tsc --filter=mobile`
   - Lints with `pnpm turbo run lint --filter=mobile`
   - Note: EAS build integration is commented out (ready for activation when needed)

**Status Checks:** Must pass before merging

---

### CI - Shared (`ci-shared.yml`)

**Triggered by:**
- Push to `main` or `develop` with changes in:
  - `shared/**`
  - `.github/workflows/ci-shared.yml`
- Pull requests to `main` or `develop` with above changes

**Jobs:**

1. **test** (runs on all triggers)
   - Installs dependencies
   - Type checks with `pnpm turbo run tsc --filter="./shared"`
   - Lints with `pnpm turbo run lint --filter="./shared"`

**Status Checks:** Must pass before merging

---

## Release Workflows (Placeholders)

### Release - Web (`release-web.yml`)

Currently a placeholder for future web release automation.

**Planned features:**
- Automated versioning & tagging
- Build optimization
- Artifact deployment
- Release notes generation

### Release - Mobile (`release-mobile.yml`)

Currently a placeholder for EAS (Expo Application Services) build integration.

**Planned features:**
- EAS build submission
- App Store distribution
- Version management
- Build credentials

---

## Branch Strategy

### `main` Branch

- **Protection Rules:** Requires CI to pass
- **Merging:** Squash commits, merge from PRs only
- **Triggers:** test job for all changes, build job for web (after test)
- **Purpose:** Production-ready code

### `develop` Branch

- **Purpose:** Integration branch for features
- **Merging:** From feature branches via PR
- **Triggers:** All CI workflows
- **Purpose:** Pre-production testing

### Feature Branches

- **Naming:** `feature/description` or `bugfix/description`
- **Source:** Branch from `develop`
- **PR:** Create PR to `develop` when ready
- **CI:** All workflows run

---

## Workflow Execution Steps

### 1. Dependency Installation

```bash
# Uses pnpm cache from GitHub Actions
pnpm install --frozen-lockfile
```

This ensures exact versions from `pnpm-lock.yaml`, preventing version drift.

### 2. Type Checking (tsc)

```bash
pnpm turbo run tsc --filter=<app>
```

- Checks TypeScript compilation
- Respects project references
- Uses incremental builds

### 3. Linting (ESLint)

```bash
pnpm turbo run lint --filter=<app>
```

- Validates code style
- Checks imports, React rules, etc.
- Fails on errors

### 4. Building

```bash
pnpm turbo run build --filter=<app>
```

- Compiles source code
- Validates bundler configuration
- Caches results

---

## Status Checks

### On Pull Request

A PR **cannot be merged** until:
- ✅ All applicable CI workflows pass (green ✓)
- ✅ Code review approved (if configured)
- ✅ Conversation resolved (if any)

### View Workflow Status

On GitHub PR page:
1. Scroll to "Checks" section
2. See status of each workflow
3. Click workflow name for detailed logs

---

## Debugging Failed Workflows

### 1. Check Logs

In GitHub Actions tab:
1. Find failed workflow run
2. Click run name
3. Expand failed job
4. View error message

### 2. Common Errors

**"pnpm install failed"**
- Check `pnpm-lock.yaml` is committed
- Verify package.json syntax

**"Type errors in tsc"**
- Run `pnpm tsc` locally to reproduce
- Check TypeScript configuration

**"ESLint errors"**
- Run `pnpm lint` locally
- Fix with `pnpm lint:fix`

**"Build failed"**
- Run `pnpm build` locally
- Check for environment variables

### 3. Run Locally to Debug

Before pushing, run locally:

```bash
# Same commands as CI
pnpm install --frozen-lockfile
pnpm turbo run tsc --filter=web
pnpm turbo run lint --filter=web
pnpm turbo run build --filter=web
```

If passes locally but fails in CI, check for:
- Environment variable differences
- Node/pnpm version mismatches
- Cache-related issues

---

## Best Practices

### Before Pushing

```bash
# Run all checks locally
pnpm lint           # Fix linting issues
pnpm tsc            # Check types
pnpm test           # Run tests
pnpm build          # Test builds

# Or run specific app
pnpm --filter web lint && pnpm --filter web tsc && pnpm --filter web build
```

### Commit Messages

Write clear commit messages:

```
feat(web): add user dashboard component
fix(mobile): resolve navigation bug
refactor(shared): extract api utilities
docs: update setup instructions
```

### PR Description

Include in PR description:
- What changes were made
- Why they were needed
- Related issues (closes #123)
- Testing done locally

---

## Future Enhancements

### Planned Additions

- [ ] Test coverage (Vitest integration)
- [ ] E2E testing (Playwright/Cypress)
- [ ] Performance benchmarking
- [ ] Security scanning (Dependabot)
- [ ] Automated release notes
- [ ] Preview deployments for staging

### EAS Build Activation (Mobile)

When ready to submit to app stores:

1. Set up EAS account & credentials
2. Uncomment `eas-build` job in `ci-mobile.yml`
3. Configure environment variables in GitHub Secrets
4. Test on feature branch

---

## Troubleshooting

### Workflow Won't Run

Check:
1. Branch name matches trigger (`main` or `develop`)
2. File paths match (check leading slashes)
3. Workflow syntax is valid
4. No `if:` condition blocking it
5. GitHub Actions are enabled in repo settings

### Cache Issues

```bash
# Clear GitHub Actions cache (if needed)
# In repository settings > Actions > General > Caching > Clear all caches
```

### Secrets & Environment Variables

To use secrets in workflows:

1. Go to repo Settings > Secrets and variables > Actions
2. Add secret with name like `API_KEY`
3. Reference in workflow: `${{ secrets.API_KEY }}`

---

## Examples

### Running Specific Workflow

```bash
# GitHub CLI (if installed)
gh workflow run ci-web.yml
```

### Re-run Failed Workflow

In GitHub UI:
1. Go to Actions tab
2. Find workflow run
3. Click "Re-run failed jobs"

### Download Artifacts

From workflow run page:
1. Click "Artifacts" section
2. Download build artifacts for debugging
