# wtf
```ascii
██╗    ██╗████████╗███████╗     ██████╗ ██████╗ ██████╗ ███████╗
██║    ██║╚══██╔══╝██╔════╝    ██╔════╝██╔═══██╗██╔══██╗██╔════╝
██║ █╗ ██║   ██║   █████╗█████╗██║     ██║   ██║██║  ██║█████╗  
██║███╗██║   ██║   ██╔══╝╚════╝██║     ██║   ██║██║  ██║██╔══╝  
╚███╔███╔╝   ██║   ██║         ╚██████╗╚██████╔╝██████╔╝███████╗
 ╚══╝╚══╝    ╚═╝   ╚═╝          ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝
```

**understand code the honest way.**

[![npm version](https://img.shields.io/npm/v/wtf-code)](https://www.npmjs.com/package/wtf-code)
[![license](https://img.shields.io/npm/l/wtf-code)](./LICENSE)
[![downloads](https://img.shields.io/npm/dm/wtf-code)](https://www.npmjs.com/package/wtf-code)

A CLI that reads your source code and explains it in a **developer meme / greentext / brutally honest style** — while still providing a useful technical summary.

No AI.<br>
No API keys.<br>
No network calls.

Just AST parsing and developer sarcasm.

```
$ wtf project

  Project analysis
──────────────────────────────────────────────────

  Files analyzed: 42

  Largest file:
    server.js (910 lines)

  Code smells detected:
    • large files
    • vague variable names

  Developer commentary:

    this project has strong "we'll refactor later" energy.

──────────────────────────────────────────────────
```

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

## Commands

| Command | Description |
|---------|-------------|
| `wtf <file>` | Analyze a file (default mode) |
| `wtf <dir>` | Analyze a directory |
| `wtf blame <file>` | See who wrote what |
| `wtf rate <file>` | Rate a file from 0 to 10 |
| `wtf diff` | Explain the current git diff |
| `wtf project` | Full project analysis from cwd |

## Flags

| Flag | Description |
|------|-------------|
| `--roast` | Full meme roast mode |
| `--explain` | Structured explanation |
| `--complexity` | Complexity analysis report |
| `--therapy` | Emotional support for your code |
| `--summary` | Short one-glance summary |
| `--json` | Raw JSON output |
| `--max-files <n>` | Max files in directory mode |

See [docs/commands.md](docs/commands.md) and [docs/flags.md](docs/flags.md) for full examples.

---

## How it works

Written in TypeScript. Analyzes JavaScript source files using [Acorn](https://github.com/acornjs/acorn).

1. Parses the AST
2. Extracts functions, classes, imports, variable names
3. Calculates code metrics, complexity, and nesting depth
4. Generates developer commentary from internal phrase pools

No AI involved. Fully deterministic. Fully offline.

---

## Supported file types

Currently analyzes: JavaScript (`.js` `.mjs` `.cjs` `.jsx`)

TypeScript file analysis is planned.

---

## Development

```
git clone https://github.com/ecx2f/wtf
cd wtf
npm install
npm run build
npm link
```

See [docs/development.md](docs/development.md) for project structure and details.

---

## Contributing

Contributions are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## License

[MIT](./LICENSE)
