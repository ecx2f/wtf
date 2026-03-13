import type { FileMetrics, DiffResult, RiskAssessment, BlameResult, ComplexityReport, DirectorySummary } from './types.js';

const greentextOpeners: string[] = [
  '> be dev',
  '> be developer',
  '> be me, a developer',
  '> wake up',
  '> open laptop',
  '> open IDE',
  '> open code',
  '> git pull',
  '> check Slack',
  '> coffee ready',
];

const greentextReactions: string[] = [
  '> pain',
  '> suffering',
  '> why',
  '> close laptop',
  '> consider career change',
  '> stare into void',
  '> deep breath',
  '> this is fine',
  '> everything is fine',
  '> refuse to elaborate',
  '> leave',
];

const fileObservations: Record<string, string[]> = {
  long: [
    '> see {lines} lines',
    '> scroll down',
    '> keep scrolling',
    '> still scrolling',
    '> there is no end',
  ],
  medium: [
    '> see {lines} lines',
    '> not terrible',
    '> manageable',
  ],
  short: [
    '> see {lines} lines',
    '> suspiciously short',
    '> where is the rest',
  ],
  noComments: [
    '> no comments',
    '> zero documentation',
    '> not a single comment in sight',
  ],
  manyFunctions: [
    '> functions everywhere',
    '> so many functions',
    "> it's functions all the way down",
  ],
  deepNesting: [
    '> nested if statements',
    '> deeper',
    '> even deeper',
    '> inception.js',
  ],
};

const roastLines: string[] = [
  'this function works but nobody knows why.',
  'classic legacy energy.',
  'clearly written during a deadline panic.',
  'variable naming confidence level: zero.',
  'someone will refactor this in 2029.',
  'this code has strong "it works on my machine" vibes.',
  'written with passion. questionable passion, but passion.',
  'the kind of code that makes senior devs sigh.',
  'this passed code review because everyone was tired.',
  'technically correct — the best kind of correct.',
  'ship it and pray.',
  'the tests pass. there are no tests.',
  'documentation: the code is self-documenting (it is not).',
  'this file has main character energy.',
  'the TODO comments outnumber the actual logic.',
  'smells like a Stack Overflow answer.',
  'this code runs on hope and caffeine.',
  'future developers will write blog posts about this.',
  'commit message was probably "fix stuff".',
  'this function is doing three jobs and complaining about none of them.',
];

const devNotes: string[] = [
  'this file probably grew organically over time.',
  'logic is doing multiple jobs.',
  'refactoring opportunity detected.',
  'someone started a pattern and then gave up.',
  "there is a design here, it's just hiding.",
  'the architecture is emergent (unplanned).',
  'this code has survived at least two rewrites.',
  'strong deadline energy throughout.',
  'the original author has since left the company.',
  'built different. not better — just different.',
];

const namingRoasts: string[] = [
  'variable names suggest a naming convention of "whatever comes to mind first".',
  'the variables tell a story: data, data2, result, final, final_final.',
  'naming confidence level: low.',
  'someone really likes single-letter variables.',
  'variable names are technically English words.',
  'the naming convention is "vibes-based".',
];

const diffComments: string[] = [
  'developer attempted a fix. results inconclusive.',
  'lines were changed. confidence was not.',
  'this diff has "one more thing" energy.',
  'the PR description says "small fix".',
  'changes detected. understanding not included.',
  'this looks like a refactor that got interrupted.',
  'someone was on a roll and then stopped.',
];

interface RiskEntry {
  threshold: number;
  level: string;
  comment: string;
}

const riskAssessments: RiskEntry[] = [
  { threshold: 200, level: 'EXTREME', comment: 'deploy on Friday for maximum excitement.' },
  { threshold: 100, level: 'HIGH', comment: 'possible side effects: unknown.' },
  { threshold: 50, level: 'MODERATE', comment: 'probably fine. probably.' },
  { threshold: 20, level: 'LOW', comment: 'a reasonable change. suspicious.' },
  { threshold: 0, level: 'MINIMAL', comment: 'so small it might be a typo fix.' },
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickN<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(n, shuffled.length));
}

export function generateGreentext(metrics: FileMetrics): string {
  const lines: string[] = [];
  lines.push(pick(greentextOpeners));

  const fileName = metrics.fileName || 'file.js';
  lines.push(`> open ${fileName}`);

  if (metrics.lines > 300) {
    lines.push(...pickN(fileObservations.long, 3).map(l => l.replace('{lines}', String(metrics.lines))));
  } else if (metrics.lines > 100) {
    lines.push(...pickN(fileObservations.medium, 2).map(l => l.replace('{lines}', String(metrics.lines))));
  } else {
    lines.push(...pickN(fileObservations.short, 2).map(l => l.replace('{lines}', String(metrics.lines))));
  }

  if (metrics.comments === 0) {
    lines.push(pick(fileObservations.noComments));
  }

  if (metrics.functionCount > 5) {
    lines.push(pick(fileObservations.manyFunctions));
  }

  lines.push(pick(greentextReactions));

  return lines.join('\n');
}

export function generateRoast(metrics: FileMetrics): string {
  const parts: string[] = [];

  parts.push(...pickN(roastLines, 3));

  if (metrics.suspiciousNames && metrics.suspiciousNames.length > 0) {
    parts.push('');
    parts.push('variable names detected:');
    metrics.suspiciousNames.forEach(n => parts.push(`  ${n}`));
    parts.push('');
    parts.push(pick(namingRoasts));
  }

  return parts.join('\n');
}

export function generateDevNote(metrics: FileMetrics): string {
  const notes: string[] = [];
  notes.push(pick(devNotes));

  if (metrics.lines > 300) {
    notes.push('this file could use a diet.');
  }
  if (metrics.functionCount > 8) {
    notes.push("that's a lot of functions for one file.");
  }
  if (metrics.classCount > 2) {
    notes.push('multiple classes in one file — bold strategy.');
  }
  if (metrics.importCount > 5) {
    notes.push('the import section is doing heavy lifting.');
  }

  return notes.join('\n');
}

export function generateDiffCommentary(_diff: DiffResult): string {
  return pick(diffComments);
}

export function getDiffRisk(totalChanged: number): RiskAssessment {
  for (const r of riskAssessments) {
    if (totalChanged >= r.threshold) {
      return { level: r.level, comment: r.comment };
    }
  }
  const last = riskAssessments[riskAssessments.length - 1];
  return { level: last.level, comment: last.comment };
}

const blameGreentexts: string[] = [
  '> be {name}\n> add feature quickly\n> promise to refactor later\n> never refactor',
  '> be {name}\n> write {lines} lines\n> no one questions it\n> become legend',
  '> be {name}\n> own {percent}% of this file\n> the bus factor is 1\n> it is {name}',
  '> be {name}\n> commit at 2am\n> "minor fix"\n> 200 lines changed',
  '> be {name}\n> write the core logic\n> leave no comments\n> vanish',
];

const blameComments: string[] = [
  'classic.',
  'respect.',
  'someone has to own it.',
  'the git log remembers everything.',
  'this is what accountability looks like.',
  'one dev to rule them all.',
];

export function generateBlameCommentary(blame: BlameResult): string {
  if (!blame.topAuthor) return '';
  const template = pick(blameGreentexts)
    .replace(/\{name\}/g, blame.topAuthor.name)
    .replace(/\{lines\}/g, String(blame.topAuthor.lines))
    .replace(/\{percent\}/g, String(blame.topAuthor.percent));
  return template + '\n\n' + pick(blameComments);
}

const complexityComments: string[] = [
  'this function is doing way too much.',
  'maybe split it before it gains consciousness.',
  'complexity level: "just one more if statement".',
  'the nesting goes deeper than your average dream.',
  'refactor this or it will refactor your sanity.',
  'this code has layers. like an onion. a sad onion.',
];

export function generateComplexityComment(_report: ComplexityReport): string {
  return pick(complexityComments);
}

const projectComments: string[] = [
  'this project has strong "we\'ll refactor later" energy.',
  'built with love, maintained with fear.',
  'the architecture tells a story. a horror story.',
  'someone planned this. then someone else didn\'t.',
  'this codebase has seen things.',
  'started as a prototype. stayed as a prototype.',
  'the README promises more than the code delivers.',
  'this project peaked at v0.1.',
];

export function generateProjectComment(summary: DirectorySummary): string {
  const lines: string[] = [];
  lines.push(pick(projectComments));
  if (summary.totalFiles > 30) lines.push('that\'s a lot of files. respect.');
  if (summary.avgLines > 200) lines.push('average file length says "we don\'t believe in small modules".');
  if (summary.suspiciousNames.length > 5) lines.push('variable naming convention: freestyle.');
  return lines.join('\n');
}

const therapyLines: string[] = [
  'You are not responsible for this code.',
  'Take a deep breath.',
  'We will get through this together.',
  'It\'s okay to not understand legacy code.',
  'The original author probably didn\'t understand it either.',
  'You are more than your git blame.',
  'This code does not define your worth.',
  'It\'s okay to close this file and walk away.',
  'Remember: even senior devs Google basic syntax.',
  'You don\'t have to fix everything today.',
  'The code is temporary. Your mental health is not.',
  'This too shall be deprecated.',
];

const therapyClosers: string[] = [
  'You\'re doing great.',
  'End of session. That\'ll be $200.',
  'Same time next sprint?',
  'Remember to hydrate.',
  'Go outside. Touch grass. Then come back.',
  'Session complete. You are valid.',
];

export function generateTherapy(metrics: FileMetrics): string {
  const lines: string[] = [];
  lines.push(...pickN(therapyLines, 4));
  lines.push('');
  if (metrics.lines > 300) lines.push('This file is long. That\'s not your fault.');
  if (metrics.comments === 0) lines.push('The lack of comments is a systemic issue, not a personal one.');
  if (metrics.suspiciousNames.length > 0) lines.push('The variable names were chosen before you arrived.');
  lines.push('');
  lines.push(pick(therapyClosers));
  return lines.join('\n');
}
