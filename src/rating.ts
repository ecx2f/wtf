import type { FileMetrics, CodeRating } from './types.js';

export function rateCode(metrics: FileMetrics, maxNesting: number): CodeRating {
  let score = 10;
  const strengths: string[] = [];
  const weaknesses: string[] = [];

  if (metrics.lines <= 150) {
    strengths.push('small file size');
  } else if (metrics.lines <= 300) {
    score -= 0.5;
  } else {
    score -= 1.5;
    weaknesses.push('large file');
  }

  if (metrics.functionCount > 0 && metrics.functionCount <= 8) {
    strengths.push('reasonable function count');
  } else if (metrics.functionCount > 12) {
    score -= 1;
    weaknesses.push('too many functions in one file');
  }

  if (metrics.avgFunctionSize > 0 && metrics.avgFunctionSize <= 20) {
    strengths.push('short functions');
  } else if (metrics.avgFunctionSize > 40) {
    score -= 1;
    weaknesses.push('long functions');
  }

  if (metrics.comments > 0) {
    strengths.push('has comments');
  } else if (metrics.lines > 50) {
    score -= 1;
    weaknesses.push('no comments');
  }

  if (metrics.suspiciousNames.length === 0) {
    strengths.push('clear variable names');
  } else if (metrics.suspiciousNames.length <= 2) {
    score -= 0.5;
    weaknesses.push('some vague variable names');
  } else {
    score -= 1.5;
    weaknesses.push('vague variable names');
  }

  if (maxNesting <= 3) {
    strengths.push('simple structure');
  } else if (maxNesting >= 5) {
    score -= 1;
    weaknesses.push('deeply nested logic');
  }

  if (metrics.classCount <= 1) {
    strengths.push('focused module');
  } else if (metrics.classCount > 2) {
    score -= 0.5;
    weaknesses.push('multiple classes in one file');
  }

  if (metrics.importCount > 0 && metrics.importCount <= 5) {
    strengths.push('minimal dependencies');
  } else if (metrics.importCount > 10) {
    score -= 0.5;
    weaknesses.push('heavy dependency list');
  }

  score = Math.max(0, Math.min(10, Math.round(score * 10) / 10));

  let verdict: string;
  if (score >= 8) verdict = 'clean and well-structured.';
  else if (score >= 6) verdict = 'functional but could be cleaner.';
  else if (score >= 4) verdict = 'functional but chaotic.';
  else if (score >= 2) verdict = 'needs serious refactoring.';
  else verdict = 'abandon all hope.';

  return {
    fileName: metrics.fileName,
    score,
    strengths: strengths.slice(0, 5),
    weaknesses: weaknesses.slice(0, 5),
    verdict,
  };
}
