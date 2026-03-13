import { Command } from 'commander';
import chalk from 'chalk';
import fs from 'node:fs';
import path from 'node:path';
import { analyzeFile, analyzeDirectory, guessPurpose, guessSteps } from './analyzer.js';
import { readGitDiff, guessDiffPurpose } from './diff.js';
import { generateGreentext, generateRoast, generateDevNote, generateDiffCommentary, getDiffRisk } from './humor.js';
import {
  formatFileAnalysis, formatExplain, formatRoast, formatDirectory,
  formatDiff, formatJson,
} from './formatter.js';
import type { CliOptions, DirectorySummary } from './types.js';

export function run(): void {
  const program = new Command();

  program
    .name('wtf')
    .description('understand code the honest way.')
    .version('1.0.0')
    .argument('[path]', 'file or directory to analyze')
    .option('--explain', 'structured explanation without heavy jokes')
    .option('--roast', 'full meme roast mode')
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
  const summary: DirectorySummary = await analyzeDirectory(dirPath, maxFiles);

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
