**Plan: Phase 1 Clerk Foundation**

Establish Clerk authentication in both web and mobile with provider wiring, session availability, and basic sign-in/sign-up plus auth guards. Defer organization features and all Convex/RTK Query migration work to later phases.

**Pre-Implementation Checklist**

1. Confirm both publishable keys are set in root env: `VITE_CLERK_PUBLISHABLE_KEY` and `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY`.
2. Confirm keys are environment-specific (local, preview, production) and not shared across environments.
3. Confirm no Clerk secret key is added to client app env files.
4. Confirm `apps/web` and `apps/mobile` own Clerk SDK setup, while `shared` remains runtime-agnostic.
5. Confirm Phase 1 scope excludes Convex wiring, RTK Query migration, and organization features.

**Execution Guardrails**

1. Stay in `apps/web` and `apps/mobile` only for Clerk wiring.
2. Do not move Convex or RTK Query work into this phase.
3. Run package-scoped lint and type-check after changes.

**Steps**

1. Phase A - Scope lock and acceptance criteria
2. Confirm included scope: Clerk dependencies, provider composition, env wiring, session readiness, basic auth screens, and auth gating in both apps.
3. Confirm excluded scope: Convex setup, RTK Query replacement/removal, Redux redesign, and org management features.
4. Define Phase 1 done-state: signed-out users see auth entry, sign-in/sign-up works, signed-in users reach app content, session context is accessible in each runtime.
5. Phase B - Dependency and env setup
6. Add Clerk SDK only where platform-specific: web package for web SDK, mobile package for Expo SDK; keep shared runtime-agnostic.
7. Add runtime env keys and typing support for each app, including fail-fast checks for missing keys in development.
8. Phase C - Web implementation
9. Update web provider composition so Clerk auth context is available at app entry while Redux remains local-state only.
10. Add basic web signed-out entry and signed-in entry switch using Clerk hooks/components.
11. Add minimal web guard behavior to prevent unauthenticated access to app content.
12. Phase D - Mobile implementation
13. Update Expo root layout provider composition to include Clerk while preserving Redux persist and theme behavior.
14. Implement Expo token cache/session wiring per Clerk guidance and validate cold-start session restoration.
15. Add basic mobile signed-out and signed-in entry behavior, with auth gating in navigation/layout.
16. Phase E - Validation and handoff
17. Run package-scoped lint/type-check for affected packages.
18. Execute manual auth matrix on web and mobile: signed-out load, sign-in, sign-up, sign-out, session restore (mobile relaunch).
19. Record Phase 2 handoff note that session availability is confirmed in both runtimes.

**Relevant files**

- apps/web/package.json - add web Clerk dependency only.
- apps/web/src/components/App.tsx - web provider composition and auth-aware entry split.
- apps/web/src/main.tsx - verify root bootstrap remains stable.
- apps/web/src/vite-env.d.ts - web env typing for Clerk key.
- apps/web/vite.config.ts - confirm env loading path strategy.
- apps/mobile/package.json - add Expo Clerk dependency and required secure token storage dependency.
- apps/mobile/src/app/_layout.tsx - mobile provider composition and auth gate placement.
- apps/mobile/src/app/index.tsx - signed-in entry behavior.
- apps/mobile/expo-env.d.ts - confirm Expo env typing approach.
- apps/mobile/app.json - verify deep-link/runtime config compatibility.
- shared/src/redux-store/index.ts - confirm Redux local-state ownership remains unchanged.
- shared/src/redux-store/apis/baseApi.ts - explicitly no Phase 1 migration changes.

**Verification**

1. Run: pnpm --filter web lint
2. Run: pnpm --filter web tsc
3. Run: pnpm --filter mobile lint
4. Run: pnpm --filter mobile tsc
5. If shared is touched, also run: pnpm --filter "./shared" lint and pnpm --filter "./shared" tsc
6. Manual checks on both apps for auth entry, sign-in, sign-up, sign-out, and guarded content visibility
7. Boundary checks: no platform Clerk SDK imports in shared, no Convex work, no RTK Query migration in this phase

**Decisions Applied**

- Include basic auth screens and guards in Phase 1.
- Defer org features to later phases.
- Keep shared package runtime-agnostic.
- Keep RTK Query path untouched in Phase 1.

If this looks right, approve and I will keep this as the execution handoff plan for implementation.