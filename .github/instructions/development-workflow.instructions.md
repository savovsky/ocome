# Development Workflow Instructions

## Turborepo Pipeline

Defined in `turbo.json`, the build pipeline orchestrates task dependencies and caching:

| Task | Depends On | Cached | Inputs |
|------|-----------|--------|--------|
| **build** | `^build` | ✓ | src/, package.json, tsconfig.json |
| **dev** | None | ✗ | (persistent, no cache) |
| **test** | `^build` | ✓ | src/, test/, package.json |
| **lint** | None | ✓ | src/, package.json |
| **tsc** | `^build` | ✓ | src/, tsconfig.json |

**Key Benefits:**
- Only affected packages rebuild (smart change detection)
- Results cached for faster subsequent runs
- Tasks respect dependency graph (`^build` = build dependencies first)

---

## Root Scripts (pnpm)

### Development

```bash
pnpm dev:web              # Start Vite dev server for web
pnpm dev:mobile           # Start Expo dev server for mobile
```

### Building

```bash
pnpm build                # Build all packages/apps (Turborepo)
pnpm build:web            # Build web app only
pnpm build:mobile         # Build mobile app only
```

### Quality Checks

```bash
pnpm lint                 # Lint all packages (ESLint)
pnpm tsc                  # Type-check all packages (TypeScript)
pnpm test                 # Run all tests (Vitest)
```

---

## Web App Scripts (`apps/web`)

```bash
pnpm --filter web start           # Start Vite dev server
pnpm --filter web build           # Build for production (dist/)
pnpm --filter web preview         # Preview production build locally
pnpm --filter web tsc             # Type check only
pnpm --filter web lint            # Lint code
pnpm --filter web lint:fix        # Lint and auto-fix
```

### Vite Server Features

- Hot module replacement (HMR)
- Fast refresh on changes
- Available at `http://localhost:5173` by default

---

## Mobile App Scripts (`apps/mobile`)

```bash
pnpm --filter mobile start        # Start Expo dev server (interactive menu)
pnpm --filter mobile android      # Build & run on Android device/emulator
pnpm --filter mobile ios          # Build & run on iOS device/simulator
pnpm --filter mobile web          # Run web version via Expo
pnpm --filter mobile tsc          # Type check only
pnpm --filter mobile lint         # Lint code
pnpm --filter mobile lint:fix     # Lint and auto-fix
```

### Expo Dev Server

Interactive menu shows options:
- Press `i` for iOS
- Press `a` for Android
- Press `w` for web
- Press `r` to reload
- Press `m` to toggle menu

---

## Shared Package Scripts (`shared`)

```bash
pnpm --filter "./shared" build    # Type check and build
pnpm --filter "./shared" tsc      # Type check only
pnpm --filter "./shared" lint     # Lint code
```

Note: Shared is a library, not executable. Changes here trigger dependent builds.

---

## Filtering Commands to Specific Packages

Turborepo filter syntax:

```bash
# By package name
pnpm --filter web <command>
pnpm --filter mobile <command>
pnpm --filter "./shared" <command>  # Note: ./shared needs ./

# All apps
pnpm --filter "web|mobile" <command>

# By directory pattern
pnpm --filter "apps/*" <command>
```

---

## Common Development Workflows

### Starting Both Dev Servers (Recommended)

**Terminal 1:** Web development
```bash
pnpm dev:web
```

**Terminal 2:** Mobile development (separate terminal)
```bash
pnpm dev:mobile
```

### Quality Check Before Commit

```bash
# Run all checks
pnpm lint
pnpm tsc
pnpm test

# Or combined (Turborepo runs in parallel)
pnpm lint && pnpm tsc && pnpm test
```

### Building for Production

```bash
# Build all
pnpm build

# Build specific app
pnpm build:web
pnpm build:mobile
```

### Updating Shared Package

When changing shared code:

```bash
# Rebuild shared
pnpm --filter "./shared" build

# Dependent apps rebuild automatically on next dev/build
# For immediate effect, restart dev servers
```

---

## Environment Variables

Create `.env` files in respective app directories:

**`apps/web/.env`**
```
VITE_API_URL=http://localhost:3000
VITE_ENVIRONMENT=development
```

**`apps/mobile/.env`**
```
EXPO_PUBLIC_API_URL=http://localhost:3000
EXPO_PUBLIC_ENVIRONMENT=development
```

---

## Cache Management

### View Turborepo Cache

```bash
# Cache is stored in .turbo/
ls -la .turbo/
```

### Clear Turborepo Cache

```bash
rm -rf .turbo
```

### Force Rebuild (Skip Cache)

```bash
pnpm build --no-cache
pnpm lint --no-cache
```

---

## Dependency Management

### Install New Package

```bash
# In root (workspace)
pnpm add package-name

# In specific workspace
pnpm --filter web add react-router-dom
pnpm --filter mobile add expo-notifications
pnpm --filter "./shared" add lodash
```

### Update All Dependencies

```bash
# Check what can be updated
pnpm outdated

# Update to latest compatible versions
pnpm update

# Update specific package
pnpm --filter web update react@latest
```

### Lock Dependencies

```bash
# Lock current versions
pnpm install --frozen-lockfile
```

---

## Troubleshooting Development

### Dev Server Not Starting

```bash
# Clear cache and reinstall
rm -rf node_modules .pnpm pnpm-lock.yaml
pnpm install

# Or just refresh dependencies
pnpm install --force
```

### Module Not Found Errors

```bash
# Verify TypeScript paths are correct
pnpm tsc --explainFiles

# Check package exports in shared/package.json
cat shared/package.json | grep exports -A 5
```

### Slow Builds

```bash
# Check what's not cached
pnpm build --verbose

# Clear Turborepo cache
rm -rf .turbo

# Rebuild
pnpm build
```

### Hot Reload Not Working (Web)

```bash
# Restart Vite dev server
# Press Ctrl+C in dev server terminal
pnpm dev:web
```

---

## Performance Tips

1. **Use pnpm always** - Faster than npm/yarn
2. **Filter commands** - Don't rebuild all apps if only testing one
3. **Leverage cache** - Turborepo caches builds automatically
4. **Watch mode** - Dev servers use file watching, very fast
5. **Parallel terminals** - Run web & mobile dev separately for independence
