---
name: git-ship
description: Run quality checks, stage changes, and commit with consistent approval workflow
---

# Git Ship Prompt

Provides a safe, repeatable workflow with consistent approval steps at predictable points.

## Invocation

Run this workflow only when the user explicitly invokes `/git-ship` or `git-ship`.
Do not infer this workflow from ambiguous phrases such as "ship this".

## Workflow Steps

### Step 1: Quality Checks

Run all linters and type checks across apps and packages without asking for approval:

```bash
pnpm lint
```

```bash
pnpm tsc
```

If either command fails:

- Report all errors and warnings clearly
- Stop the workflow immediately
- Do not proceed to staging or committing
- Do not offer override; user must fix checks first

### Step 2: Stage Changes

If all checks pass, stage all changes without asking for approval:

```bash
git status --short --branch
git add .
```

### Step 3: Propose Commit Message

After staging, suggest a conventional commit message based on the changes. Format as follows:

```text
<type>(<scope>): <subject>

<body>
```

**Ask the user to approve with these options:**

1. Approve the message as-is
2. Edit/modify the message
3. Cancel the workflow

Provide a clear interface for the user to edit if needed.

### Step 4: Commit

Once the user approves the message, commit without further approval:

```bash
git commit -m "<approved-message>"
```

### Step 5: Push Approval

After commit succeeds, explicitly ask for push approval:

- Show the final repo status
- Ask: "Ready to push to origin?"
- Wait for user confirmation

Only proceed if user approves.

### Step 6: Push and Finish

Execute push:

```bash
git push
```

Run final status check:

```bash
git status --short --branch
```

## Conventional Commit Types

- `feat:` New feature
- `fix:` Bug fix
- `chore:` Build, dependencies, or tooling changes
- `refactor:` Code refactoring without behavior change
- `docs:` Documentation changes
- `test:` Test-related changes

## Safety Rules

- Never force push unless explicitly requested
- If lint or tsc fails, report all issues and stop immediately
- If commit fails, report the exact reason and stop
- If push fails, report the error and suggest recovery steps
- Do not rewrite history unless explicitly requested

## Output Format

Keep output concise and clear:

1. Quality check results (pass/fail details)
2. Files staged (if checks passed)
3. Proposed commit message
4. User approval status
5. Commit result
6. Final push confirmation
7. Push result and final status