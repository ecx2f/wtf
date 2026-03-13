# Development

## Setup

```
git clone https://github.com/ecx2f/wtf
cd wtf
npm install
```

## Build

```
npm run build
```

Compiles TypeScript from `src/` and `bin/` into `dist/`.

## Watch mode

```
npm run dev
```

Recompiles on file changes.

## Link locally

```
npm link
```

Makes `wtf` available globally from your local build.

## Test it

```
wtf examples/messy.js
wtf examples/legacy.js --roast
wtf rate examples/legacy.js
wtf project
```

## Project structure

```
wtf/
  bin/
    wtf.ts              CLI entrypoint
  src/
    cli.ts              Commander setup and command routing
    analyzer.ts         File and directory analysis
    metrics.ts          AST-based code metrics (Acorn)
    complexity.ts       Nesting and complexity analysis
    rating.ts           Code scoring (0-10)
    blame.ts            Git blame parser
    diff.ts             Git diff reader
    humor.ts            Commentary and phrase pools
    formatter.ts        Chalk-based terminal output
    types.ts            Shared TypeScript interfaces
  examples/
    messy.js            Auth server example
    legacy.js           Legacy HTTP server example
  docs/
    commands.md         Command reference
    flags.md            Flag reference
    development.md      This file
```
