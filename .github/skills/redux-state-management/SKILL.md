---
name: redux-state-management
description: Implement and evolve Redux Toolkit + RTK Query + redux-persist patterns in shared state safely.
---

## Use When

- Adding or changing slices in `packages/shared/src/redux-store/slices/`.
- Adding RTK Query endpoints in `packages/shared/src/redux-store/apis/`.
- Updating store exports/hooks/types.

## File Ownership

- Store entrypoint: `packages/shared/src/redux-store/index.ts`
- Hooks: `packages/shared/src/redux-store/hooks/`
- API base + endpoints: `packages/shared/src/redux-store/apis/`
- UI apps consume shared exports only.

## Store Entrypoint Boundary

- Use `packages/shared/src/redux-store/index.ts` only to wire the store and register reducers/slices.
- Do not add utility functions in `packages/shared/src/redux-store/index.ts`.
- Do not add unrelated type declarations in `packages/shared/src/redux-store/index.ts`.
- Keep cross-cutting helpers and reusable types in dedicated files/folders (`hooks/`, `types/`, or feature files).

## Implementation Pattern

1. Add/modify slice or API endpoint in shared.
2. Register new slice reducers in `packages/shared/src/redux-store/index.ts`.
3. Keep types explicit for payloads and responses in feature/type files.
4. Keep invalidation tags consistent for query/mutation pairs.

## Hooks Pattern

- Keep `useStoreDispatch.ts` as a typed wrapper for `useDispatch`.
- Keep `useStoreSelector.ts` as a typed wrapper for `useSelector`.
- For each slice, expose a dedicated hook in `hooks/` that reads only that slice via `useStoreSelector`.
- Follow naming used in the folder: `useSlice<Feature>()` function in `use<Feature>.ts` with a default export.
- Keep hook files focused on selector access only; do not add store wiring or general utilities there.

## Persist + Consumer Considerations

- Keep persisted state changes backward-safe when possible.
- If state shape changes significantly, validate app boot behavior.
- Confirm both web and mobile consumers compile after shared updates.

## Validation

```bash
pnpm --filter "./packages/shared" tsc
pnpm --filter "./packages/shared" lint
pnpm --filter web tsc
pnpm --filter mobile tsc
```
