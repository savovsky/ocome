# Troubleshooting Instructions

Quick solutions for common development issues.

---

## Installation & Setup Issues

### "pnpm: command not found"

**Cause:** pnpm not installed globally

**Solution:**

```bash
# Install pnpm globally
npm install -g pnpm@9.4.0

# Verify installation
pnpm --version
```

### "EWORKSPACES Package not found"

**Cause:** Missing workspace package or incorrect pnpm-workspace.yaml

**Solution:**

```bash
# Verify workspace definition
cat pnpm-workspace.yaml

# Should contain:
# packages:
#   - 'apps/*'
#   - 'shared'

# Reinstall
pnpm install
```

### "node_modules corrupted / installation fails"

**Solution:**

```bash
# Full clean reinstall
rm -rf node_modules pnpm-lock.yaml .pnpm

# Reinstall
pnpm install
```

### "Protocol 'node:' not supported"

**Cause:** Node.js version too old

**Solution:**

```bash
# Check Node version
node --version

# Need >= 24.0.0
# Install newer Node.js from nodejs.org
```

---

## Development Server Issues

### Web Dev Server won't start (Vite)

```bash
# Check if port 5173 is in use
lsof -i :5173  # macOS/Linux
netstat -ano | findstr :5173  # Windows

# Solution 1: Kill process using port
kill -9 <PID>  # macOS/Linux
taskkill /PID <PID> /F  # Windows

# Solution 2: Use different port
pnpm --filter web start -- --port 5174
```

### Mobile dev server hangs (Expo)

```bash
# Clear Expo cache
expo start --clear

# Or kill and restart
pnpm --filter mobile start
```

### "Cannot find module" in dev server

```bash
# Restart dev server (often fixes caching issues)
# Press Ctrl+C to stop
# Run start command again

# If persists:
pnpm install
pnpm --filter web start
```

---

## Linting & Type Checking Issues

### ESLint errors locally, but CI passes

```bash
# Update ESLint cache
pnpm lint --no-cache

# Or clear everything
rm -rf node_modules/.cache
pnpm lint
```

### "Cannot find module '@ocome/shared'"

**In ESLint or at runtime**

```bash
# 1. Verify shared package exists
ls -la shared/src/index.ts

# 2. Check path alias in tsconfig.base.json
cat tsconfig.base.json | grep -A 5 '"paths"'

# 3. Rebuild shared
pnpm --filter "./shared" build

# 4. Restart dev server
# Press Ctrl+C and restart: pnpm dev:web
```

### TypeScript "Property does not exist"

**After importing from shared**

```bash
# 1. Verify export in shared
cat shared/src/redux-store/index.ts | grep export

# 2. If missing, add export
# Edit shared/src/redux-store/index.ts and add:
# export { store } from './store'

# 3. Rebuild shared
pnpm --filter "./shared" build

# 4. Restart TS server (VS Code: Ctrl+Shift+P > TypeScript: Restart TS Server)
```

### "Project references cycle detected"

**Cause:** Circular imports between packages

```bash
# Check imports in shared
grep -r "import.*from.*apps" shared/src

# Shared should NOT import from apps!
# Only apps import from shared
```

---

## Build Issues

### Build fails locally but passes in CI

```bash
# Use exact same setup as CI
pnpm install --frozen-lockfile
pnpm turbo run build --filter=web

# Check for environment variables
env | grep VITE_
```

### Build output is huge / slow

```bash
# Check what's being bundled
pnpm build --verbose 2>&1 | tail -50

# Clear cache
rm -rf .turbo dist
pnpm build

# Check for large dependencies
pnpm ls --filter=web | grep -i node_modules
```

### Missing environment variables in build

```bash
# Create .env file in app directory
cat > apps/web/.env << 'EOF'
VITE_API_URL=http://localhost:3000
VITE_ENVIRONMENT=development
EOF

# For mobile
cat > apps/mobile/.env << 'EOF'
EXPO_PUBLIC_API_URL=http://localhost:3000
EXPO_PUBLIC_ENVIRONMENT=development
EOF

# Restart dev server
```

---

## Git & Repository Issues

### "Cannot rebase: conflicts in packages"

**When pulling changes to shared package**

```bash
# Option 1: Accept incoming changes
git checkout --theirs shared/

# Option 2: Manual merge
# Edit conflicted files and resolve

# Option 3: Abort and try again
git merge --abort
git pull --rebase origin develop

# After resolving, rebuild
pnpm install
pnpm build
```

### Accidental node_modules commit

```bash
# Remove from git
git rm -r --cached node_modules

# Add to .gitignore
echo "node_modules/" >> .gitignore

# Commit
git add .gitignore
git commit -m "Remove node_modules from git"
```

### pnpm-lock.yaml conflicts

```bash
# Let pnpm resolve it
pnpm install

# This regenerates pnpm-lock.yaml
git add pnpm-lock.yaml
git commit -m "Resolve pnpm-lock conflicts"
```

---

## Performance Issues

### Commands are very slow

```bash
# Check if running all packages (expensive)
pnpm build                          # All - slow
pnpm build --filter=web             # Just web - fast
pnpm build --filter="web|mobile"    # Web or mobile

# Clear Turborepo cache (might help)
rm -rf .turbo

# Check if node_modules is healthy
pnpm install
```

### Type checking takes minutes

```bash
# Rebuild incrementally (faster after first run)
pnpm tsc

# Or just check specific package
pnpm --filter web tsc
```

### Large lock file (pnpm-lock.yaml)

```bash
# This is normal (more detailed than npm-lock.json)
# Size is not a performance issue

# Remove unused dependencies instead
pnpm prune
```

---

## Module Resolution Issues

### Module resolution errors at different times

```bash
# Clear everything and rebuild
rm -rf node_modules .pnpm pnpm-lock.yaml
pnpm install
```

### TypeScript can't find types

```bash
# Check if @types package is installed
pnpm ls @types/react

# Install missing types
pnpm add --save-dev @types/node@latest
```

---

## Redux/State Issues

### State not persisting between sessions

**Check redux-persist configuration:**

```bash
# Verify storage implementation
cat shared/src/redux-store/index.ts | grep -i persist

# For mobile, should use AsyncStorage:
# import AsyncStorage from '@react-native-async-storage/async-storage'

# For web, should use localStorage:
# import storage from 'redux-persist/lib/storage'
```

### Redux state empty on page reload

```bash
# Check if PersistGate is wrapping app
# In apps/web/main.tsx:

import { PersistGate } from 'redux-persist/lib/integration/react'
import { persistor } from '@ocome/shared/redux-store'

<PersistGate loading={null} persistor={persistor}>
  <App />
</PersistGate>
```

### API queries not updating cache

```bash
# Check invalidation tags in API endpoints
grep -r "invalidatesTags" shared/src/redux-store/apis

# Verify tags are being used:
# In mutation endpoint: invalidatesTags: ['Users']
# In query endpoint: providesTags: ['Users']
```

---

## Environment-Specific Issues

### Windows-specific issues

```bash
# Path issues on Windows
# Use forward slashes in imports, not backslashes
import { store } from '@ocome/shared/redux-store'  // ✓
import { store } from 'shared\src\redux-store'      // ✗

# Line ending issues (CRLF vs LF)
# In .gitattributes:
* text=auto
*.{js,ts,json} eol=lf
```

### macOS M1/M2 issues

```bash
# Some native modules might not build for ARM
# Try installing Rosetta 2 or using Node version manager

# Or use official Apple Silicon build of Node
# Download from nodejs.org (select "macOS Installer" for your chip)
```

### Linux permission issues

```bash
# Fix permission on node_modules
chmod -R u+w node_modules

# Or reinstall
pnpm install
```

---

## Debugging Tools

### Enable Verbose Logging

```bash
# Turborepo verbose
pnpm turbo run build --verbose

# TypeScript explain files
pnpm tsc --explainFiles 2>&1 | tail -50

# ESLint debug
DEBUG=eslint pnpm lint
```

### Check Configuration

```bash
# ESLint effective config
pnpm exec eslint --print-config src/index.ts

# TypeScript compiler options
pnpm tsc --showConfig
```

### Monitor Network/API

```bash
# In browser devtools
# 1. Open Network tab
# 2. Check API calls to localhost:3000

# For mobile, use Expo devtools
# Press 'j' in Expo CLI
```

---

## Getting Help

### Check Logs Carefully

```bash
# Save full error output
pnpm lint 2>&1 > debug.log
cat debug.log

# Look for actual error (often last few lines)
tail -20 debug.log
```

### Isolate the Problem

```bash
# Does issue affect one package or all?
pnpm --filter web lint     # Just web
pnpm --filter mobile lint  # Just mobile

# Does it happen in dev or only in CI?
pnpm lint                  # Local
# Then check GitHub Actions logs
```

### Common Fixes Checklist

```bash
[ ] pnpm install                        # Fresh install
[ ] pnpm --filter "./shared" build      # Rebuild shared
[ ] pnpm tsc                            # Type check
[ ] rm -rf .turbo && pnpm build         # Clear cache
[ ] Restart dev server (Ctrl+C + restart)
[ ] Restart editor (close and reopen)
[ ] Restart terminal/shell
```

---

## Still Stuck?

1. Check related instruction file (redux-state-management, ci-cd-workflows, etc.)
2. Search GitHub issues in project
3. Check error message carefully - often tells you exactly what's wrong
4. Isolate to minimal example - does error happen in simple reproduction?
5. Check versions - `pnpm --version`, `node --version`
