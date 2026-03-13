# Contributing

Thanks for considering contributing to **wtf-code**.

## Getting started

```
git clone https://github.com/ecx2f/wtf
cd wtf
npm install
npm run build
```

## Making changes

1. Create a branch from `main`

```
git checkout -b feat/your-feature
```

2. Make your changes in `src/`
3. Build and test

```
npm run build
node dist/bin/wtf.js examples/messy.js
```

4. Commit using [conventional commits](https://www.conventionalcommits.org/)

```
feat: add new command
fix: correct scoring logic
docs: update flag reference
refactor: simplify analyzer
chore: update dependencies
```

5. Push and open a pull request

```
git push origin feat/your-feature
```

## What you can work on

- New analysis heuristics
- New humor phrases (add to `src/humor.ts`)
- Support for more file types
- Bug fixes
- Documentation improvements

## Adding a new command

1. Create your module in `src/`
2. Add the interface to `src/types.ts` if needed
3. Add a format function to `src/formatter.ts`
4. Register the command in `src/cli.ts`
5. Document it in `docs/commands.md`

## Adding new phrases

All humor lives in `src/humor.ts`. Just add strings to the existing arrays. Keep the tone: funny but not mean.

## Code style

- TypeScript strict mode
- ESM imports
- No external runtime dependencies beyond what's in `package.json`
- No network calls

## Pull requests

- Keep PRs small and focused
- One feature or fix per PR
- Include a clear description of what changed and why
