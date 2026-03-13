# Flags

Flags can be combined with `wtf <file>`.

## `--roast`

Full meme roast mode.

```
wtf messy.js --roast
```

```
  🔥 Roasting: messy.js
──────────────────────────────────────────────────

    > be developer
    > open messy.js
    > see 180 lines
    > no comments
    > pain

  function login()

    this function works but nobody knows why.
    variable naming confidence level: zero.

    detected variable names:
      data
      data2
      result
      final
      final_final

──────────────────────────────────────────────────
```

## `--explain`

Structured technical explanation with minimal humor.

```
wtf file.js --explain
```

## `--complexity`

Complexity analysis report.

```
wtf server.js --complexity
```

```
  Complexity report: server.js
──────────────────────────────────────────────────

  Functions:              14
  Average function length: 32 lines
  Largest function:        processRequest() (97 lines)
  Max nesting depth:       6

  Warnings:
    • deeply nested conditionals
    • repeated vague variable naming

  Verdict:
    concerning

  this function is doing way too much.

──────────────────────────────────────────────────
```

## `--therapy`

Emotional support for your code.

```
wtf legacy.js --therapy
```

```
  Therapy session for legacy.js
──────────────────────────────────────────────────

  You are not responsible for this code.
  Take a deep breath.
  We will get through this together.
  It's okay to not understand legacy code.

  The lack of comments is a systemic issue, not a personal one.

  Session complete. You are valid.

──────────────────────────────────────────────────
```

## `--summary`

Short one-glance summary.

```
wtf file.js --summary
```

```
  auth.js
──────────────────────────────────────────────────

  180 lines · 12 functions · 1 class

  main job: handles user authentication

  verdict: reasonable but messy.

──────────────────────────────────────────────────
```

## `--json`

Raw JSON output. Useful for automation and piping.

```
wtf file.js --json
```
