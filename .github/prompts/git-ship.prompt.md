---
name: git-ship
description: Stage changes, craft a commit message, commit, and push with minimal prompts
---

# Git Ship Prompt

Use this prompt to run a safe, repeatable Git workflow with as few approval steps as possible.

## Default Behavior

1. Check repository state first:
   - `git status --short --branch`
2. If there are no staged files, stage all tracked/untracked changes:
   - `git add -A`
3. Propose a conventional commit message from the diff summary.
4. Commit and push using a single terminal command when possible:
   - `git add -A; git commit -m "<message>"; git push`

## Safety Rules

- Never force push unless explicitly requested.
- If commit fails (for example, nothing to commit), report the exact reason and stop.
- If push fails, report the error and suggest the next safe command.
- Do not rewrite history unless explicitly requested.

## Message Rules

Prefer Conventional Commits:

- `feat: ...`
- `fix: ...`
- `chore: ...`
- `refactor: ...`
- `docs: ...`
- `test: ...`

If no message is provided by the user, propose one and ask for confirmation before commit.

## Output Format

Keep output concise:

1. Status summary
2. Commit message used
3. Command executed
4. Result (success/failure)