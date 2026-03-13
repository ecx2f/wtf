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

```
  Project summary:
──────────────────────────────────────────────────

  Files analyzed: 8
  Largest file: server.js (320 lines)
  Total functions: 24
  Total classes: 2

  Most common function names:
    • init (×3)
    • handleRequest (×2)

  Average file length: 95 lines

  Possible issues:
    • 1 large file (>300 lines)
    • repeated vague variable naming

──────────────────────────────────────────────────

  Developer note:
    this project has strong "deadline energy".
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

```
  What happened here:
──────────────────────────────────────────────────

  Bug fix attempt.

  Changes:
    +45 lines
    -12 lines
    3 files changed

  Files:
    • src/auth.js
    • src/utils.js
    • test/auth.test.js

  Risk level:
    MODERATE
    probably fine. probably.

  developer attempted a fix. results inconclusive.

──────────────────────────────────────────────────
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
