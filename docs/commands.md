# Commands

## `wtf <file>`

Analyze a single file. Default mode combines explanation and humor.

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

## `wtf <dir>`

Analyze a directory of files.

```
wtf src/
```

## `wtf blame <file>`

Analyze who wrote what using git blame.

```
wtf blame auth.js
```

```
  Analyzing contributions: auth.js
──────────────────────────────────────────────────

  Lines written by:
    Andrew                 120  ████████████████████ 67%
    Luna                    40  ██████ 22%
    Unknown                 20  ███ 11%

  Developer commentary:

    > be Andrew
    > add feature quickly
    > promise to refactor later
    > never refactor

    classic.

──────────────────────────────────────────────────
```

## `wtf diff`

Explains the current git diff.

```
wtf diff
```

## `wtf project`

Full project analysis from the current working directory.

```
wtf project
```

```
  Project analysis
──────────────────────────────────────────────────

  Files analyzed: 42

  Largest file:
    server.js (910 lines)

  Total functions: 128
  Total classes:   5
  Average file length: 110 lines

  Most common function names:
    init (×4)
    handleRequest (×3)
    processData (×2)

  Code smells detected:
    • 3 large files (>300 lines)
    • repeated vague variable naming

  Developer commentary:

    this project has strong "we'll refactor later" energy.

──────────────────────────────────────────────────
```

## `wtf rate <file>`

Rate a file from 0 to 10.

```
wtf rate server.js
```

```
  Code rating: server.js
──────────────────────────────────────────────────

  6.2 / 10

  strengths:
    • reasonable function count
    • has comments
    • focused module

  weaknesses:
    • large file
    • vague variable names
    • deeply nested logic

  verdict:
    functional but could be cleaner.

──────────────────────────────────────────────────
```
