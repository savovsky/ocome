# TypeScript Configuration Instructions

## Overview

The monorepo uses TypeScript **project references** for efficient type-checking across the workspace.

**Key Files:**
- `tsconfig.json` - Root solution file
- `tsconfig.base.json` - Shared compiler options
- `apps/web/tsconfig.json` - Web solution file
- `apps/mobile/tsconfig.json` - Mobile app config
- `shared/tsconfig.json` - Shared package config

---

## File Hierarchy

```text
tsconfig.json (root solution)
├── references: [web, mobile, shared]
│
├── tsconfig.base.json (shared compiler options)
│   ├── target: ES2020
│   ├── module: ESNext
│   ├── strict: true
│   ├── moduleResolution: bundler
│   ├── composite: true
│   └── paths: @ocome/* aliases
│
├── apps/web/
│   ├── tsconfig.json (solution file)
│   │   └── references: [web-app, shared]
│   ├── tsconfig.app.json (extends base, app-specific)
│   └── tsconfig.node.json (standalone for Node.js tooling)
│
├── apps/mobile/
│   └── tsconfig.json (extends base, React Native JSX)
│
└── shared/
    └── tsconfig.json (extends base)
```

---

## Base Configuration (`tsconfig.base.json`)

### Compiler Options

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    
    "composite": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    
    "baseUrl": ".",
    "paths": {
      "@ocome/shared": ["shared/src/index.ts"],
      "@ocome/shared/*": ["shared/src/*"]
    }
  }
}
```

### Key Settings Explained

| Option | Purpose |
|--------|---------|
| `target: "ES2020"` | Modern JavaScript output |
| `module: "ESNext"` | ES modules output |
| `strict: true` | Enforce strict type checking |
| `composite: true` | Enable project references |
| `moduleResolution: "bundler"` | Modern module resolution |
| `paths: { "@ocome/*": [...] }` | Path aliases for imports |

---

## Path Aliases

### Defined Aliases

In `tsconfig.base.json`:

```json
"paths": {
  "@ocome/shared": ["shared/src/index.ts"],
  "@ocome/shared/*": ["shared/src/*"]
}
```

### Usage Examples

```typescript
// ✅ Correct - Using path alias
import { store } from '@ocome/shared/redux-store'
import type { RootState } from '@ocome/shared/redux-store'
import { useStoreSelector } from '@ocome/shared/redux-store/hooks'
import type { ModalKeys } from '@ocome/shared/types/modals'

// ❌ Avoid - Relative paths across packages
import { store } from '../../shared/src/redux-store'
```

---

## Project References

### Root Solution File (`tsconfig.json`)

```json
{
  "files": [],
  "references": [
    { "path": "apps/web" },
    { "path": "apps/mobile" },
    { "path": "shared" }
  ]
}
```

**Purpose:** Links all projects for incremental type-checking

### Web Solution File (`apps/web/tsconfig.json`)

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist"
  },
  "include": ["src"],
  "references": [
    { "path": "../../shared" }
  ]
}
```

**Purpose:** References shared package as dependency

### Mobile Config (`apps/mobile/tsconfig.json`)

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "jsx": "react-native",
    "outDir": "./dist"
  },
  "include": ["src"],
  "references": [
    { "path": "../../shared" }
  ]
}
```

**Key Difference:** `"jsx": "react-native"` for React Native compilation

### Shared Package (`shared/tsconfig.json`)

```json
{
  "extends": "../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "declaration": true
  },
  "include": ["src"]
}
```

**Purpose:** Library package, declares types for consumers

---

## Web App Special Case

Web has two TypeScript configs:

### `tsconfig.app.json` (Vite App)

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "jsx": "react-jsx",
    "types": ["vite/client"]
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}
```

**Used by:** Vite for building the app

### `tsconfig.node.json` (Vite Config)

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "module": "ESNext",
    "types": ["node"]
  },
  "include": ["vite.config.ts"]
}
```

**Used by:** TypeScript for checking Vite configuration file

---

## Type Checking Workflow

### Local Development

```bash
# Type check all packages
pnpm tsc

# Type check specific package
pnpm --filter web tsc
pnpm --filter mobile tsc
pnpm --filter "./shared" tsc
```

### In CI Pipeline

```bash
# CI automatically runs type checking
pnpm turbo run tsc --filter=<app>
```

### What It Checks

1. Variable and function type annotations
2. Module imports and exports
3. TypeScript strict mode violations
4. JSX syntax (platform-specific)
5. Path alias resolution

---

## Common Issues & Solutions

### "Cannot find module '@ocome/shared'"

**Cause:** Path alias not recognized

**Solutions:**

```bash
# 1. Verify tsconfig.json includes path
cat tsconfig.base.json | grep "@ocome" -A 2

# 2. Restart TypeScript server in editor
# In VS Code: Ctrl+Shift+P > TypeScript: Restart TS Server

# 3. Rebuild shared package
pnpm --filter "./shared" build
```

### "Type 'X' is not assignable to type 'Y'"

**Cause:** Type mismatch between packages

**Solution:**

```bash
# Check type definitions are exported correctly
cat shared/src/index.ts
cat shared/package.json | grep exports -A 10

# Update index.ts if types aren't exported
export type { RootState } from './redux-store'
```

### "Project references cycle detected"

**Cause:** Circular dependency between packages

**Solution:**

1. Check imports in failing packages
2. Ensure shared only imports from itself
3. Apps can import from shared, but not vice versa

### "Unused variable"

**Cause:** `noUnusedLocals: true` is strict

**Solutions:**

```typescript
// Option 1: Remove unused variable
const unused = getData() // ❌ Error
const used = getData()   // ✅ Use it

// Option 2: Prefix with underscore (if legitimately unused)
const _unused = getData() // ✅ Allowed

// Option 3: Disable in specific file
// @ts-nocheck (disables entire file)
// @ts-ignore (disables next line)
```

---

## Best Practices

### Type Exports from Shared

```typescript
// ✅ shared/src/redux-store/index.ts
export type { RootState, AppDispatch } from './store'
export { store, persistor } from './store'

// ✅ Easy import in apps
import type { RootState } from '@ocome/shared/redux-store'
import { store } from '@ocome/shared/redux-store'
```

### Strict Mode Compliance

```typescript
// ✅ Always type function parameters
function add(a: number, b: number): number {
  return a + b
}

// ✅ Type return values for public APIs
export function getData(): Promise<User[]> {
  // ...
}

// ❌ Avoid `any` type
function process(data: any) { } // Don't do this

// ❌ Avoid implicit return type
export function calculate(x: number) { // Should have `: number`
  return x * 2
}
```

### Path Aliases

```typescript
// ✅ Use path aliases
import { store } from '@ocome/shared/redux-store'

// ❌ Avoid relative paths across packages
import { store } from '../../../shared/src/redux-store'
```

---

## Incremental Type Checking

TypeScript builds incrementally on type changes:

```bash
# First run (full check)
pnpm tsc
# Result: Complete type check of all files

# Second run (fast, only changed files)
pnpm tsc
# Result: Only checks changed files (much faster)
```

**Cache Location:** `.tsbuildinfo` files in each package

---

## Debugging Type Resolution

View how TypeScript resolves imports:

```bash
# Explain file resolution
pnpm tsc --explainFiles 2>&1 | grep "@ocome"

# Check if module resolution works
pnpm tsc --noEmit --traceResolution 2>&1 | tail -100
```

These show exactly how TypeScript finds and resolves modules.

---

## Update TypeScript Version

When updating TypeScript:

```bash
# Update in all packages
pnpm update typescript@latest

# Verify configuration still works
pnpm tsc --noEmit
```

Check `tsconfig.json` for breaking changes in TypeScript release notes.
