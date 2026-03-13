import { Command } from 'commander';
import chalk from 'chalk';
import fs from 'node:fs';
import path from 'node:path';
import { analyzeFile, analyzeDirectory, guessPurpose, guessSteps } from './analyzer.js';
import { readGitDiff, guessDiffPurpose } from './diff.js';
import { readGitBlame } from './blame.js';
import { analyzeComplexity } from './complexity.js';
import { rateCode } from './rating.js';
import {
  generateGreentext, generateRoast, generateDevNote,
  generateDiffCommentary, getDiffRisk, generateBlameCommentary,
  generateComplexityComment, generateProjectComment, generateTherapy,
} from './humor.js';
import {
  formatFileAnalysis, formatExplain, formatRoast, formatDirectory,
  formatDiff, formatBlame, formatComplexity, formatProject,
  formatTherapy, formatSummary, formatRating, formatJson,
} from './formatter.js';
import type { CliOptions } from './types.js';

export function run(): void {
  const program = new Command();

  program
    .name('wtf')
    .description('understand code the honest way.')
    .version('1.0.0')
    .argument('[path]', 'file or directory to analyze')
    .option('--explain', 'structured explanation without heavy jokes')
    .option('--roast', 'full meme roast mode')
    .option('--complexity', 'complexity analysis report')
    .option('--therapy', 'emotional support for your code')
    .option('--summary', 'short one-glance summary')
    .option('--json', 'output raw JSON metrics')
    .option('--max-files <n>', 'max files to analyze in directory mode', '50')
    .option('--top <n>', 'show top N results', '5')
    .action(async (targetPath: string | undefined, options: CliOptions) => {
      if (!targetPath) {
        program.help();
        return;
      }

      const resolved = path.resolve(targetPath);

      if (!fs.existsSync(resolved)) {
        console.error(`\n  Error: path not found — ${resolved}\n`);
        process.exit(1);
      }

      const stat = fs.statSync(resolved);

      if (stat.isDirectory()) {
        await handleDirectory(resolved, options);
      } else {
        handleFile(resolved, options);
      }
    });

  program
    .command('diff')
    .description('analyze the current git diff')
    .option('--json', 'output raw JSON')
    .action((options: CliOptions) => {
      handleDiff(options);
    });

  program
    .command('blame <file>')
    .description('analyze who wrote the code')
    .option('--json', 'output raw JSON')
    .action((file: string, options: CliOptions) => {
      handleBlame(file, options);
    });

  program
    .command('project')
    .description('full project analysis (runs from current directory)')
    .option('--json', 'output raw JSON')
    .option('--max-files <n>', 'max files to analyze', '100')
    .action(async (options: CliOptions) => {
      await handleProject(options);
    });

  program
    .command('rate <file>')
    .description('rate a file from 0 to 10')
    .option('--json', 'output raw JSON')
    .action((file: string, options: CliOptions) => {
      handleRate(file, options);
    });

  program.parse();
}

function handleFile(filePath: string, options: CliOptions): void {
  const metrics = analyzeFile(filePath);
  const purpose = guessPurpose(metrics);
  const steps = guessSteps(metrics);

  if (options.json) {
    console.log(formatJson({ metrics, purpose, steps }));
    return;
  }

  if (options.summary) {
    console.log(formatSummary(metrics, purpose));
    return;
  }

  if (options.therapy) {
    const therapy = generateTherapy(metrics);
    console.log(formatTherapy(metrics.fileName, therapy));
    return;
  }

  if (options.complexity) {
    const source = fs.readFileSync(path.resolve(filePath), 'utf-8');
    const report = analyzeComplexity(metrics, source);
    const comment = generateComplexityComment(report);
    console.log(formatComplexity(report, comment));
    return;
  }

  if (options.explain) {
    console.log(formatExplain(metrics, purpose, steps));
    return;
  }

  if (options.roast) {
    const greentext = generateGreentext(metrics);
    const roast = generateRoast(metrics);
    console.log(formatRoast(metrics, greentext, roast));
    return;
  }

  const greentext = generateGreentext(metrics);
  const devNote = generateDevNote(metrics);
  const humor = greentext + '\n\n' + devNote;
  console.log(formatFileAnalysis(metrics, purpose, steps, humor));
}

async function handleDirectory(dirPath: string, options: CliOptions): Promise<void> {
  const maxFiles = parseInt(options.maxFiles ?? '50', 10) || 50;
  const summary = await analyzeDirectory(dirPath, maxFiles);

  if (options.json) {
    console.log(formatJson(summary));
    return;
  }

  if (summary.totalFiles === 0) {
    console.log('\n  No analyzable JavaScript/TypeScript files found.\n');
    return;
  }

  console.log(formatDirectory(summary));

  if (!options.explain) {
    const notes: string[] = [];
    if (summary.issues.length > 0) notes.push('this project has strong "deadline energy".');
    else notes.push('this project looks surprisingly organized.');

    if (summary.avgLines > 200) notes.push('files are on the thicc side.');
    if (summary.suspiciousNames.length > 3) notes.push('variable naming conventions are "creative".');

    console.log(chalk.bold.white('\n  Developer note:'));
    for (const note of notes) {
      console.log(chalk.italic.gray(`    ${note}`));
    }
    console.log('');
  }
}

function handleDiff(options: CliOptions): void {
  const diff = readGitDiff();

  if (!diff) {
    console.log('\n  No git diff found. Working tree is clean (or not a git repo).\n');
    return;
  }

  if (options.json) {
    console.log(formatJson(diff));
    return;
  }

  const purpose = guessDiffPurpose(diff);
  const risk = getDiffRisk(diff.totalChanged);
  const commentary = generateDiffCommentary(diff);

  console.log(formatDiff(diff, purpose, risk, commentary));
}

function handleBlame(file: string, options: CliOptions): void {
  const resolved = path.resolve(file);
  if (!fs.existsSync(resolved)) {
    console.error(`\n  Error: file not found — ${resolved}\n`);
    process.exit(1);
  }

  const blame = readGitBlame(resolved);
  if (!blame) {
    console.log('\n  Could not read git blame. File may not be tracked.\n');
    return;
  }

  if (options.json) {
    console.log(formatJson(blame));
    return;
  }

  const commentary = generateBlameCommentary(blame);
  console.log(formatBlame(blame, commentary));
}

async function handleProject(options: CliOptions): Promise<void> {
  const maxFiles = parseInt(options.maxFiles ?? '100', 10) || 100;
  const summary = await analyzeDirectory(process.cwd(), maxFiles);

  if (options.json) {
    console.log(formatJson(summary));
    return;
  }

  if (summary.totalFiles === 0) {
    console.log('\n  No analyzable JavaScript/TypeScript files found.\n');
    return;
  }

  const commentary = generateProjectComment(summary);
  console.log(formatProject(summary, commentary));
}

function handleRate(file: string, options: CliOptions): void {
  const resolved = path.resolve(file);
  if (!fs.existsSync(resolved)) {
    console.error(`\n  Error: file not found — ${resolved}\n`);
    process.exit(1);
  }

  const source = fs.readFileSync(resolved, 'utf-8');
  const metrics = analyzeFile(resolved);
  const { maxNesting } = analyzeComplexity(metrics, source);
  const rating = rateCode(metrics, maxNesting);

  if (options.json) {
    console.log(formatJson(rating));
    return;
  }

  console.log(formatRating(rating));
}
