# Convex and Clerk Integration Brief

## Purpose

This document captures the current recommended direction for backend, authentication, and state management in the `ocome` monorepo.

It is intended to be used later as the basis for a detailed implementation plan.

## Current Repo State

- `apps/web` is a React and Vite application.
- `apps/mobile` is a React Native and Expo application.
- `shared` contains shared types, theme logic, and the current Redux store.
- Shared remote data access is currently modeled through RTK Query.
- Local persisted client state is currently handled with Redux and `redux-persist`.

## Recommended Direction

- Use Convex as the backend and realtime data layer.
- Use Clerk for authentication, user lifecycle, organizations, and permissions.
- Remove RTK Query after Convex data hooks are in place.
- Keep Redux and `redux-persist` for local client state for now.
- Restrict Redux to local state concerns only.

## Why This Direction

- Convex is a better fit than RTK Query for remote application state once Convex becomes the system of record.
- Clerk reduces the amount of custom security and account lifecycle work that would otherwise need to be built and maintained.
- Keeping Redux avoids a larger rewrite and preserves the current shared client-state setup across web and mobile.
- This is the lowest-risk migration path with a clear separation between remote data and local UI state.

## Architecture Boundaries

### Convex Responsibilities

- Application data storage
- Queries, mutations, and realtime subscriptions
- Server-side business logic
- Backend authorization enforcement
- Data models for domain entities

### Clerk Responsibilities

- Sign up and sign in
- Session management
- Email and identity lifecycle
- User profile lifecycle
- Organizations and memberships
- Roles and permissions
- Invitation and membership flows

### Redux Responsibilities

- Theme preferences
- Language preferences
- Local UI state
- Local persisted app preferences
- Non-sensitive client-only workflow state

### What Should Not Stay In Redux

- Backend entities fetched from Convex
- Auth truth
- Organization membership truth
- Permission truth
- Remote data caching

## Security Model

- Clerk is the source of truth for identity and organization context.
- Convex must enforce authorization on the server for every sensitive query and mutation.
- Client-side conditional rendering must not be treated as a security boundary.
- Roles and permissions from Clerk should be used to inform backend checks, not replace them.

## Monorepo Placement Guidance

- `apps/web` should own web-specific Clerk provider wiring and web environment variables.
- `apps/mobile` should own Expo-specific Clerk provider wiring and secure session storage details.
- Convex client wiring will exist in both apps, adapted to each runtime.
- Shared domain types and reusable non-platform-specific helpers can remain in `shared`.
- `shared` must not import app-specific web or mobile runtime code.

## Provider Strategy

### Web

- Wrap the app with Clerk provider first.
- Wrap Convex provider under Clerk so Convex can use Clerk auth.
- Keep the existing Redux provider while Redux still owns local client state.

### Mobile

- Wrap the Expo app with Clerk provider using the Expo-compatible SDK and token cache.
- Wrap Convex provider under Clerk.
- Keep the existing Redux provider while Redux still owns local client state.

## Migration Sequence

### Phase 1

- Add Clerk to web and mobile.
- Establish the base authentication flow in both apps.
- Confirm session availability in both runtimes.

### Phase 2

- Add Convex to the repo.
- Connect Convex auth to Clerk.
- Create the initial Convex schema and basic authenticated queries and mutations.

### Phase 3

- Replace RTK Query usage with Convex hooks.
- Migrate current placeholder remote data access to Convex queries and mutations.
- Remove RTK Query endpoints once consumers are switched.

### Phase 4

- Keep Redux and `redux-persist` focused on local state.
- Remove Redux code that exists only to support remote data fetching.
- Review whether Redux still earns its cost after the Convex migration settles.

## Risks

- Web and Expo auth flows differ in setup complexity.
- Mobile token and session handling require more care than web setup.
- Authorization mistakes can happen if backend checks are deferred or treated as optional.
- If Redux scope is not reduced, remote and local state concerns may drift back together.
- If shared code becomes coupled to runtime-specific auth details, the monorepo boundaries will erode.

## Questions To Answer Before Implementation Planning

- Which Clerk organization features are needed in the first release
- What roles and permissions are required initially
- Which current Redux slices remain after RTK Query removal
- Which entities should be modeled first in Convex
- What environment variable strategy will be used for local, preview, and production deployments

## Planning Outcome To Target

The later implementation plan should produce:

- package-level dependency placement for web, mobile, shared, and root
- provider and bootstrap changes in each app
- initial Convex schema and auth integration shape
- RTK Query removal steps
- Redux scope cleanup steps
- lint and type-check validation steps per affected package

## Architecture Health Checklist

Use this checklist to validate whether implementation remains on-track with the target architecture.

### Green

- `shared` only contains runtime-agnostic code (types, keys, theme, local state logic) and does not import web or mobile runtime APIs.
- Clerk is the only source of truth for identity, session, org membership, and roles.
- Convex functions enforce authorization server-side for sensitive queries and mutations.
- Remote entities are fetched and mutated through Convex hooks, not Redux slices or RTK Query endpoints.
- Redux and `redux-persist` are used only for local client state (theme, language, UI/workflow preferences).
- Web and mobile each own platform-specific provider setup and env wiring.
- Package-scoped lint and type-check pass for all changed packages.

### Yellow

- Some remote data still flows through RTK Query while Convex is partially adopted.
- A small amount of auth or org context is duplicated in Redux for convenience.
- Authorization checks exist for most, but not all, sensitive Convex operations.
- `shared` has helper code that is close to runtime-specific concerns, but still isolated.
- One platform (usually mobile) is behind in auth/session hardening.

### Red

- `shared` imports app-specific code or runtime SDKs, breaking monorepo boundaries.
- Redux is still used as a source of truth for backend entities or auth/permission truth.
- Client-side role checks are relied on without matching server-side Convex authorization.
- RTK Query and Convex both remain primary remote data paths with overlapping ownership.
- Session/token handling is unreliable in mobile (frequent logout, inconsistent auth state).
- Critical package lint or type-check failures are ignored during migration.

### Release Gate

Before marking migration milestones complete, confirm:

1. All new remote read/write paths use Convex.
2. Auth and organization truth is Clerk-only.
3. Convex authorization checks exist for every sensitive operation.
4. Redux usage is limited to local persisted client state.
5. `shared` remains runtime-agnostic.
6. `web`, `mobile`, and `shared` pass lint and type-check in package scope.

## Final Recommendation

Adopt Convex and Clerk together.

Remove RTK Query after Convex hooks are ready.

Keep Redux and `redux-persist` for now, but narrow them to local persisted client state only.
