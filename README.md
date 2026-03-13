# wtf

**understand code the honest way.**

[![npm version](https://img.shields.io/npm/v/wtf-code)](https://www.npmjs.com/package/wtf-code)
[![license](https://img.shields.io/npm/l/wtf-code)](./LICENSE)
[![downloads](https://img.shields.io/npm/dm/wtf-code)](https://www.npmjs.com/package/wtf-code)

A CLI that reads your source code and explains it in a **developer meme / greentext / brutally honest style** — while still providing a useful technical summary.

No AI. No API keys. No network calls. Just AST parsing and questionable developer decisions.

```
$ wtf legacy.js --roast

  🔥 Roasting: legacy.js
──────────────────────────────────────────────────

    > be developer
    > open legacy.js
    > see 420 lines
    > no comments
    > pain

  function handleData()

    this function works but nobody knows why.
    classic legacy energy.
    variable naming confidence level: zero.

──────────────────────────────────────────────────
```

---

## Install

```
npm install -g wtf-code
```

---

## Usage

### Analyze a file

```
wtf file.js
```

```
  Analyzing file: auth.js
──────────────────────────────────────────────────

  Purpose:
  Handles user authentication.

  Main components:
    • function login()
    • function verifyToken()
    • class UserManager

  Metrics:
    Lines:     180
    Functions: 12
    Classes:   1
    Imports:   3

  Developer commentary:

    > be dev
    > open auth.js
    > see 180 lines
    > no comments
    > pain

    this file probably grew organically over time.

──────────────────────────────────────────────────
```

### Roast mode

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

### Explain mode

```
wtf file.js --explain
```

Structured technical explanation with minimal humor.

### Directory analysis

```
wtf src/
```

Analyze an entire project.

### Git diff explanation

```
wtf diff
```

Explains what a commit actually did.

### JSON output

```
wtf file.js --json
```

Useful for automation.

---

## Flags

| Flag | Description |
|------|-------------|
| `--explain` | Structured explanation |
| `--roast` | Full meme roast mode |
| `--json` | Raw JSON output |
| `--max-files <n>` | Max files analyzed in directory mode |
| `--top <n>` | Show top N results |

---

## How it works

1. Parses JavaScript using [Acorn](https://github.com/acornjs/acorn)
2. Walks the AST
3. Extracts: functions, classes, imports, variable names
4. Calculates simple code metrics
5. Generates developer commentary using phrase pools

No AI involved. Just deterministic analysis and developer sarcasm.

---

## Supported languages

Currently: JavaScript (`.js` `.mjs` `.cjs` `.jsx`)

TypeScript support planned.

---

## License

[MIT](./LICENSE)
