---
name: create-update-markdown-file
description: "**MANDATORY FOR ALL .md FILES** — Apply markdownlint rules (MD031 blank lines around code blocks, MD040 language tags, MD022 heading spacing) when creating or updating ANY Markdown file. ALWAYS read this skill BEFORE touching .md files."
---

## When to Apply

Read and apply this skill automatically when:

- Creating any new `.md` file
- Updating any existing `.md` file
- User reports markdown formatting issues or markdownlint errors

## Required Markdownlint Rules

**MD031 - Blank lines around fenced code blocks**

- Add blank line before opening ` ```lang `
- Add blank line after closing ` ``` `
- Code blocks directly adjacent to text/headings violate this rule

**MD040 - Language identifier on all code blocks**

- Every code block must specify a language: ` ```bash `, ` ```json `, ` ```typescript `, ` ```text `
- Never use bare ` ``` ` without a language tag

**MD022 - Blank lines around headings**

- Add blank line before `## Heading`
- Add blank line after `## Heading`

**MD026 - No trailing punctuation in headings**

- Headings should not end with `.`, `!`, or `:`

**MD029 - Ordered list item prefix**

- Use consistent numbering style for ordered lists (1., 2., 3.)
- Do not mix numbering styles (e.g., 1., 2., 5.) in the same list
- Each item should increment by one: 1., 2., 3., etc.

**MD032 - Blank lines around lists**

- Add blank line before first list item
- Add blank line after last list item

**MD009 - No trailing spaces**

- Remove spaces at end of lines

**MD060 - Consistent table formatting**

- Use one table style consistently per file

## Pre-completion Checklist

Before finishing markdown work:

1. Every code block has blank lines before and after
2. Every code block has a language tag
3. All headings have blank lines around them
4. Heading hierarchy is logical (no level skipping)
5. No trailing punctuation in headings
6. No trailing spaces anywhere
