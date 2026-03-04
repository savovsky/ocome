---
name: redux-state-management
description: Implement and evolve Redux Toolkit + RTK Query + redux-persist patterns in shared state safely.
---

## Use When

- Adding or changing slices in `shared/src/redux-store/slices/`.
- Adding RTK Query endpoints in `shared/src/redux-store/apis/`.
- Updating store exports/hooks/types.

## File Ownership

- Store entrypoint: `shared/src/redux-store/index.ts`
- Hooks: `shared/src/redux-store/hooks/`
- API base + endpoints: `shared/src/redux-store/apis/`
- UI apps consume shared exports only.

## Implementation Pattern

1. Add/modify slice or API endpoint in shared.
2. Export from shared redux index if needed.
3. Keep types explicit for payloads and responses.
4. Keep invalidation tags consistent for query/mutation pairs.

## Persist + Consumer Considerations

- Keep persisted state changes backward-safe when possible.
- If state shape changes significantly, validate app boot behavior.
- Confirm both web and mobile consumers compile after shared updates.

## Validation

```bash
pnpm --filter "./shared" tsc
pnpm --filter "./shared" lint
pnpm --filter web tsc
pnpm --filter mobile tsc
```
