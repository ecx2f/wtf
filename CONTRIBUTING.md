# Contributing

Thanks for considering contributing to **wtf-code**.

## Getting started

1. Fork the repo on GitHub
2. Clone your fork

```
git clone https://github.com/YOUR_USERNAME/wtf
cd wtf
npm install
npm run build
```

3. Add the original repo as upstream

```
git remote add upstream https://github.com/ecx2f/wtf
```

## Making changes

1. Make sure your fork is up to date

```
git fetch upstream
git checkout main
git merge upstream/main
```

2. Create a branch from `main`

```
git checkout -b feat/your-feature
```

3. Make your changes in `src/`
4. Build and test

```
npm run build
node dist/bin/wtf.js examples/messy.js
```

5. Commit using [conventional commits](https://www.conventionalcommits.org/)

```
feat: add new command
fix: correct scoring logic
docs: update flag reference
refactor: simplify analyzer
chore: update dependencies
```

6. Push to your fork

```
git push origin feat/your-feature
```

7. Open a Pull Request from your fork to `ecx2f/wtf:main`

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
