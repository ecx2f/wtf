import { execSync } from 'node:child_process';
import path from 'node:path';
import type { BlameResult } from './types.js';

export function readGitBlame(filePath: string): BlameResult | null {
  const resolved = path.resolve(filePath);
  try {
    const raw = execSync(`git blame --porcelain "${resolved}"`, {
      encoding: 'utf-8',
      maxBuffer: 1024 * 1024 * 10,
    });
    return parseBlame(raw, path.basename(resolved));
  } catch {
    return null;
  }
}

function parseBlame(raw: string, fileName: string): BlameResult {
  const lines = raw.split('\n');
  const authorLineCounts: Record<string, number> = {};
  let totalLines = 0;

  for (const line of lines) {
    if (line.startsWith('author ')) {
      const author = line.slice(7).trim();
      authorLineCounts[author] = (authorLineCounts[author] || 0) + 1;
      totalLines++;
    }
  }

  const authors = Object.entries(authorLineCounts)
    .map(([name, lines]) => ({ name, lines, percent: Math.round((lines / totalLines) * 100) }))
    .sort((a, b) => b.lines - a.lines);

  const topAuthor = authors.length > 0 ? authors[0] : null;

  return {
    fileName,
    totalLines,
    authors,
    topAuthor,
  };
}
