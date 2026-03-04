---
name: create-update-md-file
description: Create or update Markdown files while staying compliant with markdownlint formatting and spacing rules.
---

## Auto-Trigger (MANDATORY WORKFLOW)

This skill **MUST** be applied automatically whenever:

- Creating **any new `.md` file** (regardless of location or purpose)
- Updating **any existing `.md` file** in the repo

Do **NOT** skip this—all markdown must comply with markdownlint standards in this repository.

## Required Rules

- Blank lines around headings (`MD022`).
- No trailing punctuation in headings (`MD026`).
- Blank lines around fenced code blocks (`MD031`).
- Blank lines around lists (`MD032`).
- Language set on fenced code blocks (`MD040`).
- Consistent table formatting (`MD060`).
- No trailing spaces (`MD009`).

## Practical Checklist

- Keep heading hierarchy simple and consistent.
- Ensure each code block declares language (`bash`, `json`, `typescript`, etc.).
- Use one table style consistently in each file.
- Avoid accidental whitespace-only line changes.
