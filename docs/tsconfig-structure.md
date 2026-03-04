# TypeScript Configuration Structure

This document explains the TypeScript configuration setup in this monorepo and how the various `tsconfig.json` files relate to each other.

## Overview

The monorepo uses a **base + solution** pattern with **project references** to enable efficient type-checking across packages and apps while respecting the distinct compiler requirements of Expo (React Native) and Vite (web).

## File Structure

```text
ocome/
├── tsconfig.json              # Root solution config (project references only)
├── tsconfig.base.json         # Shared compiler options for packages and apps
├── apps/
│   ├── mobile/
│   │   └── tsconfig.json      # Expo app config (extends base, adds react-native JSX)
│   └── web/
│       ├── tsconfig.json      # Web solution config (references only)
│       ├── tsconfig.web-base.json # Shared web/Vite compiler options
│       ├── tsconfig.app.json  # Vite app config (extends web base, react-jsx)
│       └── tsconfig.node.json # Vite tooling config (extends web base, Node.js)
└── shared/
    └── tsconfig.json          # Shared library config (extends base)
```

## Configuration Files Explained

### `tsconfig.base.json` (Root)

**Purpose:** Shared compiler options for all packages and the mobile app.

**Key Settings:**

- `target: "ES2020"` - JavaScript target
- `module: "ESNext"` - Modern ES modules
- `moduleResolution: "bundler"` - Bundler-style resolution
- `strict: true` - Strict type checking enabled
- `composite: true` - Enables project references
- `paths` - Monorepo path aliases (`@ocome/*`)

**Who extends it:**

- `apps/mobile/tsconfig.json`
- `shared/tsconfig.json`

### `tsconfig.json` (Root)

**Purpose:** Solution-style configuration that orchestrates the entire monorepo build.

**Key Settings:**

- `files: []` - Does not compile any files directly
- `references` - Lists all sub-projects (apps and packages)

**Why it's separate from base:**
Solution configs should not inherit compiler options that affect emit behavior, as they only coordinate project references.

### `apps/mobile/tsconfig.json`

**Purpose:** Expo (React Native) application configuration.

**Extends:** `../../tsconfig.base.json`

**Key Overrides:**

- `jsx: "react-native"` - React Native JSX transform
- `include: ["src", ".expo/types/**/*.ts", "expo-env.d.ts"]` - Source files
- `references` - Links to shared package

### `apps/web/tsconfig.json`

**Purpose:** Solution config for the Vite web app (coordinates app + node configs).

**Key Settings:**

- `files: []` - Pure solution config
- `references` - Points to `tsconfig.app.json`, `tsconfig.node.json`, and packages

**Why it's a solution config:**
The Vite app needs two distinct compiler configs (one for app code, one for build tooling), so this acts as a coordinator.

### `apps/web/tsconfig.app.json`

**Purpose:** Vite application code configuration (what runs in the browser).

**Extends:** `./tsconfig.web-base.json`

**Key Settings:**

- `composite: true` - Part of project references
- `jsx: "react-jsx"` - React 17+ JSX transform
- `noEmit: true` - Vite handles the build
- `target: "ES2022"` - Modern browser target
- `types: ["vite/client"]` - Vite-specific types
- `include: ["src"]` - Application source only

### `apps/web/tsconfig.node.json`

**Purpose:** Vite build tooling configuration (e.g., `vite.config.ts`).

**Extends:** `./tsconfig.web-base.json`

**Key Settings:**

- `composite: true` - Part of project references
- `target: "ES2023"` - Modern Node.js target
- `lib: ["ES2023"]` - Node.js runtime (no DOM)
- `types: ["node"]` - Node.js types only
- `noEmit: true` - Config files aren't emitted
- `include: ["vite.config.ts"]` - Build tooling only

### `shared/tsconfig.json`

**Purpose:** Shared package configurations.

**Extends:** `../../tsconfig.base.json`

**Key Overrides:**

- `outDir: "./dist"` - Compiled output directory
- `rootDir: "./src"` - Source directory
- `include: ["src"]` - Package source files

### Why `shared` does not use web app config

`shared` is a cross-platform library consumed by both web and mobile.

- It should inherit platform-neutral defaults from `tsconfig.base.json`.
- It should not inherit Vite app-only settings from `apps/web/tsconfig.app.json` (for example `types: ["vite/client"]`, browser-focused libs, and app-local `baseUrl`).
- Keeping `shared` independent from web app config prevents browser-specific assumptions from leaking into mobile consumers.

## How Project References Work

Project references enable TypeScript to:

1. **Build incrementally** - Only rebuild changed projects
2. **Enforce boundaries** - Packages can only import from referenced projects
3. **Share types efficiently** - Declaration files (`.d.ts`) are used across projects

### Reference Chain Example

```text
apps/mobile/tsconfig.json
  └─ references → shared
```

## Common Commands

```bash
# Type-check entire monorepo (using project references)
pnpm exec tsc -b

# Type-check specific project
pnpm exec tsc -p apps/mobile/tsconfig.json --noEmit
pnpm exec tsc -p apps/web/tsconfig.app.json --noEmit

# Rebuild all with verbose output
pnpm exec tsc -b --verbose

# Clean build artifacts
pnpm exec tsc -b --clean
```

## Why This Structure?

### Separation of Concerns

- **Base config** provides shared defaults
- **Solution configs** orchestrate multi-project builds without interfering with compiler behavior
- **App-specific configs** customize for Expo vs. Vite requirements

### JSX Handling

Different JSX transforms are needed:

- Mobile: `"jsx": "react-native"` (Expo Metro)
- Web: `"jsx": "react-jsx"` (Vite with React)

### Build Tool Optimization

- Vite projects use `noEmit: true` (Vite handles transpilation)
- Packages use `outDir` to emit declaration files for consumption by apps

### Monorepo Path Aliases

The `paths` in `tsconfig.base.json` enable clean imports:

```typescript
import { ... } from '@ocome/shared/keys';
import type { ... } from '@ocome/shared/types';
import { ... } from '@ocome/shared/redux-store';
```

## Troubleshooting

### "Cannot use JSX unless the '--jsx' flag is provided"

- Likely compiling from root without project references
- Use `pnpm exec tsc -b` instead of `pnpm exec tsc`
- Or target specific project: `pnpm exec tsc -p apps/mobile/tsconfig.json`

### "Referenced project may not disable emit"

- Solution configs (with `files: []`) should not extend base config
- Apps/packages with `noEmit: true` must be leaf nodes in reference graph

### Changes not detected

- Run `pnpm exec tsc -b --clean` to clear stale build info
- Ensure `composite: true` is set in all referenced projects

## Maintenance Tips

1. **Don't extend base in solution configs** - Keep `tsconfig.json` and `apps/web/tsconfig.json` as pure reference coordinators
2. **Keep web configs isolated from root base** - Use `apps/web/tsconfig.web-base.json` + leaf configs for Vite-specific requirements
3. **Use project references consistently** - If a package imports another, add it to `references`
4. **Test with build mode** - Always validate changes with `pnpm exec tsc -b`
