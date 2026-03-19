# ADR-003 Invitation, Role, and Billing Model for Coach-Team App

## Status

Accepted for MVP direction (session decisions on 2026-03-14).

## Context

This ADR captures the outcomes from the product and architecture discussion about:

- Invitation flow and fallback behavior
- Identity versus authorization boundaries
- Tenant, admin, and member relationships
- Billing ownership and subscription scope
- MVP permission model for coach-team-player workflows

The goal is to remove ambiguity before implementation in Clerk and Convex.

## Domain Language for MVP

- Tenant: one customer workspace, usually managed by one or more coaches
- Group: a team inside a tenant
- Admin: coach role with management permissions
- Member: player role with mostly read permissions

For MVP, one member belongs to one group within a tenant.

## Decision Summary

1. Signup alone never grants admin access.
2. Admin is granted only by explicit server-authorized events.
3. Invitations are email-only in MVP.
4. Invitation acceptance uses secure link token as primary path.
5. A short invite code is allowed as a mobile fallback path.
6. Members are free; subscription is admin-managed and tenant-scoped.
7. Subscription limits apply to tenant capabilities, not member app access.

## Relationship Model

1. One tenant can have multiple admins.
2. One tenant can have multiple groups.
3. One group has many members.
4. For MVP, one member is assigned to one group per tenant.
5. Future extension can allow member multi-group membership.

## Identity and Role Assignment Rules

### Core Principle

Authentication and role assignment are separate.

- Clerk authenticates who the user is.
- Convex authorizes what the user can do in a tenant.

### Role Assignment Events

Admin role can be obtained only via:

1. Tenant creation bootstrap: creator becomes admin of that tenant.
2. Admin invitation acceptance: invited user becomes admin in that tenant.

Member role can be obtained via:

1. Member invitation acceptance.

### Non-Events

The following do not change roles:

- Signup without invite
- App install without invite
- Visiting the web app without invite

In these cases, user has an account but no tenant role yet.

## Invitation Flow

### Channel Policy

MVP invitation channel is email only.

### Invite Content

Invitation email should include:

1. Web invite acceptance link
2. App Store link
3. Google Play link
4. Short one-time backup invite code (for mobile deep-link fallback)

### Acceptance Logic

1. User opens link and authenticates (signup or login).
2. Convex validates invite token and context.
3. If deep link fails, user enters backup code.
4. Convex re-validates code and invite state.
5. Convex grants membership/admin role according to invite payload.
6. Invite is marked consumed.

### Validation Rules in Convex

Convex must enforce:

- Token/code is valid
- Invite is unexpired
- Invite is not revoked
- Invite is unused
- Email match policy
- Target tenant/group exists
- Role in invite is allowed

### Suggested MVP Guardrails

- Default expiry: 7 days
- High-privilege admin invites: shorter expiry (24 to 72 hours)
- Single-use invites
- Revocation before acceptance
- Idempotent acceptance mutation
- Audit events for create, send, accept, revoke, expire

## Role Conflict and Downgrade Prevention

Invitation acceptance must not silently downgrade privileges.

For the same tenant:

- Existing admin plus member invite stays admin
- Existing member plus admin invite becomes admin
- Demotion requires explicit admin action

Role changes must be explicit and auditable.

## Billing and Subscription Model

### Billing Scope

Subscription is tenant-scoped, not person-scoped.

- A tenant has one active subscription state.
- Admins manage subscription for that tenant.
- Members never manage billing.

### Who Pays

Only admins are effectively billed via tenant subscription plans.

Members use the app for free.

### Free Tier Behavior

Free tier still requires an admin for tenant functionality.

Free tier limits are applied by entitlement checks, for example:

- Maximum number of groups
- Maximum number of members
- Access to advanced features

### Lapse Behavior

If paid subscription lapses:

1. Restrict admin premium actions.
2. Keep member core access available.
3. Enforce restrictions in Convex authorization and entitlement checks.

## MVP Permission Matrix

### Admin (Coach)

- Manage subscription and plan changes
- Create and manage groups
- Invite admins and members
- Manage member assignment
- Manage notes, surveys, and notifications
- Moderate chat

### Member (Player)

- Read assigned content and announcements
- Participate in group chat
- Answer assigned surveys
- No billing access
- No tenant/group administration

## User Journey Examples

### Example 1 Signup Without Invite

1. User installs app and signs up.
2. User is authenticated only.
3. User is prompted to create a tenant or use an invitation.
4. No admin rights are granted automatically.

### Example 2 Member Invite by Email

1. Coach sends member invite to player email.
2. Player opens link and signs up.
3. Convex validates invite and email policy.
4. Player is added as member to target group.
5. Player can read content, chat, and answer surveys.

### Example 3 Admin Invite and Billing Access

1. Existing admin sends admin invite.
2. Invited coach accepts and becomes admin in same tenant.
3. New admin can manage subscription and plans.
4. Tenant still has one subscription state.

### Example 4 Existing Admin Receives Member Invite

1. Existing admin receives member invite in same tenant.
2. Acceptance does not downgrade role.
3. Effective role remains admin.

### Example 5 Expired Invite Recovery

1. User opens expired link.
2. System shows invite expired.
3. User requests resend from admin path.
4. Admin issues a new invite.

## Data and Authorization Notes for Convex

1. Membership must be tenant-scoped and role-scoped.
2. Invite acceptance mutation must be idempotent.
3. Server-side checks are source of truth for:

- Role assignment
- Invite validity
- Plan entitlements

4. Keep schema and logic prepared for future multi-group membership extension.

## Out of Scope for MVP

1. Public/shareable invite links without email targeting
2. Complex custom invitation-code-only auth without signed links
3. Member multi-group membership in same tenant
4. Advanced role set beyond admin and member
5. Seat-based billing by individual member account

## Temporary Defaults Until Decided

These defaults are intentionally strict to prevent scope creep and implementation drift.

1. Email mismatch on invite acceptance is rejected with no admin override path in MVP.
2. Invite resend policy is capped at 3 resends per 24 hours per invite.
3. Invite expiry defaults to 7 days for member invites and 72 hours for admin invites.
4. Bulk invites (CSV or import) are excluded from MVP.
5. First-join terms/privacy acceptance is not a separate gate beyond normal signup for MVP.
6. Admin invite acceptance does not require a second admin confirmation step in MVP.

## Consequences

### Positive

- Clear security boundary and less role ambiguity
- Simple mental model for users and implementation
- Lower risk of accidental privilege escalation or downgrade
- Fast MVP delivery with room to evolve

### Tradeoffs

- Some edge cases deferred to post-MVP
- Additional UX needed for no-role authenticated users
- Admin invite flow needs careful email and fallback handling

## Follow-Up Implementation Plan Inputs

When implementation starts, derive:

1. Convex invitation state machine and mutations
2. Clerk integration points for invite acceptance callbacks
3. Tenant entitlement checks for feature gating
4. Web and mobile onboarding screens for no-role users
5. Admin and member permission checks per feature
