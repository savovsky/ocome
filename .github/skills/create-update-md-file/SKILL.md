---
name: create-update-md-file
description: Create or update markdown files while adhering to markdownlint rules to ensure consistent formatting, proper spacing, code blocks, tables, headings, and no trailing issues. Use this skill when creating new .md files or modifying existing markdown content.
---

## Markdown Linting Rules

Follow these markdownlint rules when creating or updating markdown files to ensure consistent formatting and readability.

### MD022 - Blanks Around Headings

**Rule:** Headings should be surrounded by blank lines both above and below.

**Issue:** "Expected: 1; Actual: 0; Below" means there's no blank line after the heading.

**Incorrect:**

```markdown
## My Heading
This text comes immediately after the heading with no blank line.
```

**Correct:**

```markdown
## My Heading

This text has a blank line after the heading.
```

---

### MD026 - No Trailing Punctuation

**Rule:** Headings should not end with punctuation marks (., :, !, ?, etc.).

**Incorrect:**

```markdown
## My Heading:
## What is this?
```

**Correct:**

```markdown
## My Heading
## What is this
```

---

### MD031 - Blanks Around Fences

**Rule:** Fenced code blocks should be surrounded by blank lines both above and below.

**Incorrect:**

```markdown
Some text
```python
code here
```
More text
```

**Correct:**

```markdown
Some text

```python
code here
```

More text
```

---

### MD032 - Blanks Around Lists

**Rule:** Lists should be surrounded by blank lines (one blank line before and after the list).

**Incorrect:**

```markdown
Some text
- Item 1
- Item 2
More text
```

**Correct:**

```markdown
Some text

- Item 1
- Item 2

More text
```

---

### MD040 - Fenced Code Language

**Rule:** Fenced code blocks must specify a language for syntax highlighting.

**Incorrect:**

```markdown
```
function hello() {
  console.log("Hello");
}
```
```

**Correct:**

```markdown
```javascript
function hello() {
  console.log("Hello");
}
```
```

Common languages: `javascript`, `typescript`, `python`, `json`, `markdown`, `shell`, `bash`, `powershell`, `html`, `css`, `sql`, `yaml`, etc.

---

### MD060 - Table Column Style

**Rule:** Table pipes must have consistent spacing. For "compact" style, there should be proper spacing around table columns.

**Incorrect:**

```markdown
| Header 1 | Header 2 |
| --- | --- |
| Cell 1 | Cell 2 |
```

**Correct:**

```markdown
|Header 1|Header 2|
|---|---|
|Cell 1|Cell 2|
```

Or use "comfortable" style with proper spacing:

```markdown
| Header 1 | Header 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |
```

---

### MD009 - No Trailing Spaces

**Rule:** Lines should not have trailing whitespace. Expected: 0 or 2 spaces maximum (2 spaces can indicate a line break in markdown).

**Incorrect:**

```
This line has trailing spaces
This one too
```

**Correct:**

```
This line has no trailing spaces
This one doesn't either
```

If you need a hard line break, use exactly 2 trailing spaces:

```
Line 1
Line 2
```

---

## Quick Checklist

When creating or updating markdown files, verify:

- [ ] Headings have blank lines above and below
- [ ] Headings don't end with punctuation
- [ ] Code blocks have blank lines around them
- [ ] Code blocks specify a language
- [ ] Lists have blank lines before and after
- [ ] Tables use consistent pipe spacing
- [ ] No trailing spaces at the end of lines
