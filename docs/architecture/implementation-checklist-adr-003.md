# Implementation Checklist for ADR-003

## Purpose

This document contains the execution-ready checklist derived from [ADR-003 Invitation, Role, and Billing Model for Coach-Team App](ADR-003-invitation-role-billing-model.md).

Use this checklist to implement the invitation, role, and billing model across shared, web, and mobile.

## Phase 1 Identity and Invitation Backbone

1. Define Convex invitation state machine: created, sent, accepted, revoked, expired.
2. Implement invite acceptance mutation with idempotency and full server-side validation.
3. Enforce role assignment rules: signup alone gives no tenant role; admin only via tenant creation or admin invite.
4. Add invite email template inputs: web link, app store links, backup code.
5. Add audit events for invitation lifecycle and role assignment changes.

## Phase 2 Membership and Authorization Rules

1. Implement tenant-scoped membership model with admin and member roles.
2. Enforce no silent role downgrade on invite acceptance.
3. Implement explicit demotion path as separate admin action.
4. Lock MVP membership rule: one member in one group per tenant.
5. Add centralized permission checks for admin-only actions.

## Phase 3 Subscription Entitlements

1. Implement tenant-scoped subscription state and entitlement resolver.
2. Allow any tenant admin to manage subscription actions.
3. Implement free-tier limits: groups, members, premium feature flags.
4. Enforce graceful lapse behavior: restrict admin premium actions while keeping member core access.
5. Add subscription and entitlement audit logs for key admin actions.

## Phase 4 Web and Mobile UX Flows

1. Add no-role post-auth screen: create tenant or join via invitation.
2. Add invite acceptance flow on web with error states: expired, revoked, used, email mismatch.
3. Add mobile fallback flow using backup code when deep links fail.
4. Add billing visibility only for admins.
5. Keep member app free and focused on read, chat, and survey actions.

## Validation Gate Per Phase

1. Run lint for affected packages.
2. Run type-check for affected packages.
3. Run targeted feature tests for invitation, role, and entitlement logic.
4. Verify no client-only authorization paths bypass Convex checks.

## Package Mapping

### shared

1. Invitation schemas, role models, entitlement checks, and authorization helpers.
2. Shared keys/types for invite states, roles, and entitlement flags.

### apps/web

1. Invite acceptance UI and error handling states.
2. Admin billing and plan management visibility.
3. No-role onboarding entry screen.

### apps/mobile

1. Deep link invite handling and backup code fallback entry.
2. No-role onboarding flow.
3. Member-first free experience with chat/survey participation.
