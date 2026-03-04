# ESLint Rule Explanation Prompt

Use this prompt to get a structured explanation of any ESLint rule:

## Prompt Template

```text
Analyze this ESLint rule: [RULE_NAME_HERE]

Provide a structured explanation with:

1. **What It Does**: Clear description with code examples showing:
   - Behavior when rule is ON (enforced)
   - Behavior when rule is OFF (disabled)
   - If applicable, different severity levels (error/warn)

2. **Why It Exists**: The problem this rule solves or prevents

3. **Context for My Setup**:
   - Given my current tech stack (check package.json and tsconfig)
   - Given my project type (monorepo/single app, TypeScript/JavaScript, React version, build tool)
   - Is this rule still relevant or legacy?

4. **Should I Keep It?**: Clear recommendation with reasoning:
   - KEEP: Why it's beneficial
   - REMOVE: Why it's redundant or harmful
   - MODIFY: Suggest better configuration

5. **Best Practices**: Modern standards and common patterns

Format code examples with proper syntax highlighting and show both ✅ GOOD and ❌ BAD patterns where applicable.
```

## Example Usage

```text
Analyze this ESLint rule: 'react-hooks/exhaustive-deps': 'warn'

Provide a structured explanation with:
[... rest of template ...]
```

## Quick Version (Minimal Prompt)

For a shorter prompt:

```text
Explain ESLint rule [RULE_NAME] with: What it does (with examples), why it exists, should I keep it for my TypeScript + React + Vite project, and best practices.
```
