# Code Quality Instructions

## Overview

Code quality is enforced by **ESLint** (linting) and **Prettier** (formatting) with strict TypeScript type checking.

**Tools:**
- ESLint 9.39.3+ - Code quality & style rules
- Prettier 3.5.3+ - Code formatting (automatic)
- TypeScript 5.9.2+ - Type safety (strict mode)
- Vitest 4.0.18+ - Unit testing

---

## ESLint Configuration

### Shared Config (`eslint.config.js`)

The root ESLint config is extended by all packages:

```javascript
// Base configs
ESLint recommended rules
TypeScript-ESLint recommended rules
Expo ESLint config (React + React Native)

// Additional plugins
React Refresh (HMR detection)
Prettier integration (formatting)

// Language settings
ECMAScript 2020
Browser globals
```

### What ESLint Checks

| Category | Examples |
|----------|----------|
| **Syntax Errors** | Undeclared variables, missing imports |
| **Style Issues** | Unused variables, inconsistent formatting |
| **TypeScript** | Type errors, unused types |
| **React** | Missing dependency arrays, unused state |
| **Imports** | Circular dependencies, missing exports |

---

## Linting Commands

### Check Code Quality

```bash
# All packages
pnpm lint

# Specific package
pnpm --filter web lint
pnpm --filter mobile lint
pnpm --filter "./shared" lint
```

### Auto-Fix Issues

```bash
# All packages
pnpm lint:fix

# Specific package
pnpm --filter web lint:fix
pnpm --filter mobile lint:fix
```

**Note:** `lint:fix` automatically fixes formatting and some linting issues. Manual fixes needed for rule violations.

---

## Common ESLint Rules

### no-unused-vars

Variable declared but never used.

```typescript
// ❌ Error
const user = fetchUser()

// ✅ Correct
const user = fetchUser()
console.log(user.name)

// ✅ OK - underscore prefix for legitimately unused
const _error = performAction()
```

### no-implicit-any

Function parameter without type annotation.

```typescript
// ❌ Error
function add(a, b) {
  return a + b
}

// ✅ Correct
function add(a: number, b: number): number {
  return a + b
}
```

### no-undef

Variable used without import/declaration.

```typescript
// ❌ Error
export function getData() {
  return UserAPI.getAll() // UserAPI not imported
}

// ✅ Correct
import { UserAPI } from '@ocome/shared/redux-store/apis'

export function getData() {
  return UserAPI.getAll()
}
```

### react/exhaustive-deps

useEffect dependency array incomplete.

```typescript
// ❌ Error
useEffect(() => {
  setData(userId)
}, []) // userId dependency missing

// ✅ Correct
useEffect(() => {
  setData(userId)
}, [userId])
```

---

## Prettier Configuration

### Automatic Code Formatting

Prettier is integrated into ESLint and runs on `lint:fix`:

```bash
pnpm lint:fix
# Automatically formats:
# - Line length (80 chars)
# - Semicolons
# - Quotes (double → single where possible)
# - Trailing commas
# - Import organization (via plugin)
```

### Config Options (via ESLint)

From `.eslintrc` or `eslint.config.js`:

- **Print Width:** 80 characters
- **Tab Width:** 2 spaces
- **Trailing Commas:** es5 (objects, arrays, params where valid)
- **Quotes:** Single quotes where possible
- **Semicolons:** Added where required

### Import Organization

The **Trivago Prettier Plugin** auto-sorts imports:

```typescript
// Before lint:fix
import { z } from 'zod'
import { store } from '@ocome/shared/redux-store'
import React from 'react'
import { useState } from 'react'

// After lint:fix (auto-organized)
import React, { useState } from 'react'
import { z } from 'zod'

import { store } from '@ocome/shared/redux-store'
```

Groups:
1. React/third-party imports
2. Relative imports
3. Type imports separated

---

## Type Checking (TypeScript)

### Strict Mode Enabled

All packages use TypeScript strict mode for maximum safety:

```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true
  }
}
```

### Check Types

```bash
# All packages
pnpm tsc

# Specific package
pnpm --filter web tsc
pnpm --filter mobile tsc
```

### Type Compliance Examples

```typescript
// ❌ Implicit any (error)
function process(data) {
  return data.value
}

// ✅ Type annotated
function process(data: { value: number }): number {
  return data.value
}

// ❌ Missing return type
export function getValue() {
  return 42
}

// ✅ Explicit return type
export function getValue(): number {
  return 42
}

// ❌ Unused parameter
function fetch(url: string, retry: number) {
  return fetch(url)
}

// ✅ Either use it or prefix with underscore
function fetch(url: string, _retry?: number) {
  return fetch(url)
}
```

---

## Pre-Commit Quality Check

Before committing, run locally:

```bash
# Full quality check
pnpm lint              # ESLint all
pnpm tsc               # Type check all
pnpm test              # Run tests (if configured)

# Or specific app
pnpm --filter web lint && pnpm --filter web tsc
```

**Pro Tip:** Set up git hooks to run these automatically (husky + lint-staged).

---

## Fixing Quality Issues

### 1. ESLint Errors (Most Common)

```bash
# Run linting
pnpm lint

# Try auto-fix
pnpm lint:fix

# Manual fixes needed for:
# - Missing imports
# - Type annotations
# - Rule violations not auto-fixable
```

### 2. TypeScript Errors

```bash
# Find errors
pnpm tsc

# Fix types:
# - Add type annotations
# - Check import paths
# - Verify package exports
```

### 3. Format Issues (Rare)

```bash
# Auto-fix formatting
pnpm lint:fix

# Prettier will handle:
# - Line length
# - Semicolons
# - Quotes
# - Indentation
```

---

## Quality in CI Pipeline

### Automated Checks

All workflows run quality checks before allowing merges:

```bash
pnpm install --frozen-lockfile
pnpm turbo run lint --filter=<app>
pnpm turbo run tsc --filter=<app>
pnpm turbo run build --filter=<app>
```

### PR Status Checks

PR cannot merge until:
- ✅ Linting passes
- ✅ Type checking passes
- ✅ Build succeeds

---

## Best Practices

### 1. Type All Exports

```typescript
// ❌ Avoid
export const getData = async (id) => {
  return fetch(`/api/users/${id}`).then(r => r.json())
}

// ✅ Type everything
export async function getData(id: string): Promise<User> {
  const response = await fetch(`/api/users/${id}`)
  return response.json()
}
```

### 2. Use Type Inference Safely

```typescript
// ✅ OK - type inferred from return
const count = 0
const incremented = count + 1 // type: number (inferred)

// ❌ Avoid - implicit any
function process(data) { } // Should be typed

// ✅ OK - complex types still explicit
const store: ReturnType<typeof configureStore> = configureStore(config)
```

### 3. No `any` Type

```typescript
// ❌ Never use
const data: any = getData()

// ✅ Use `unknown` with type narrowing
const data: unknown = getData()
if (typeof data === 'object' && data !== null) {
  // Now TypeScript knows it's an object
}

// ✅ Or use specific types
const data: User[] = getData()
```

### 4. Unused Variables

```typescript
// ❌ Error
const user = fetchUser()
render()

// ✅ Use it
const user = fetchUser()
render(user)

// ✅ Or prefix with underscore
const _user = fetchUser() // Acknowledge unused
render()
```

---

## Ignoring Rules (When Necessary)

### Per-Line Ignore

```typescript
// eslint-disable-next-line no-unused-vars
const _tempDebugData = console.log(data)
```

### Per-Block Ignore

```typescript
/* eslint-disable no-console */
console.log('Debug info')
console.log(debugData)
/* eslint-enable no-console */
```

### Entire File Ignore

```typescript
// eslint-disable
// Use sparingly - top of file only
```

**Best Practice:** Document why you're ignoring a rule.

---

## Testing

### Run Tests

```bash
# All packages
pnpm test

# Specific package
pnpm --filter web test
```

### Write Tests

Vitest configuration handles unit tests. Example:

```typescript
import { describe, it, expect } from 'vitest'
import { add } from './math'

describe('add', () => {
  it('should add two numbers', () => {
    expect(add(2, 3)).toBe(5)
  })
})
```

---

## Troubleshooting Quality Issues

### Workspace Linting Fails

```bash
# Try fixing all at once
pnpm lint:fix

# If some issues remain, check specific packages
pnpm --filter web lint
pnpm --filter mobile lint
```

### Type Errors in CI But Not Locally

```bash
# Ensure dependencies are installed
pnpm install --frozen-lockfile

# Clear cache and try again
rm -rf .turbo node_modules/.cache
pnpm tsc
```

### ESLint Doesn't Recognize Path Aliases

```bash
# Restart TS Server in editor (Ctrl+Shift+P in VS Code)
# Or re-initialize node_modules
pnpm install --force
```

---

## Continuous Improvement

### Review Quality Metrics

```bash
# Check what rules are failing most
pnpm lint 2>&1 | grep "✖" | cut -d: -f4 | sort | uniq -c

# Example output:
# 5 no-unused-vars
# 3 no-explicit-any
# 1 react/exhaustive-deps
```

### Update Rules

As team grows, update ESLint rules in `eslint.config.js` based on:
- Most common violations
- Team agreement on style
- Maintainability goals
