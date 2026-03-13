import type { FileMetrics, ComplexityReport } from './types.js';

export function analyzeComplexity(metrics: FileMetrics, source: string): ComplexityReport {
  const lines = source.split('\n');

  let maxNesting = 0;
  let currentNesting = 0;
  let deeplyNestedLines = 0;

  for (const line of lines) {
    const trimmed = line.trim();
    const opens = (trimmed.match(/[{(]/g) || []).length;
    const closes = (trimmed.match(/[})]/g) || []).length;
    currentNesting += opens - closes;
    if (currentNesting < 0) currentNesting = 0;
    if (currentNesting > maxNesting) maxNesting = currentNesting;
    if (currentNesting >= 4) deeplyNestedLines++;
  }

  const sortedFunctions = [...metrics.functions].sort((a, b) => b.lines - a.lines);
  const largestFunction = sortedFunctions.length > 0 ? sortedFunctions[0] : null;
  const longFunctions = sortedFunctions.filter(f => f.lines > 30);

  const warnings: string[] = [];
  if (maxNesting >= 5) warnings.push('deeply nested conditionals');
  else if (maxNesting >= 4) warnings.push('moderately nested conditionals');
  if (metrics.suspiciousNames.length > 2) warnings.push('repeated vague variable naming');
  if (largestFunction && largestFunction.lines > 50) warnings.push(`function ${largestFunction.name}() is very long (${largestFunction.lines} lines)`);
  if (longFunctions.length > 3) warnings.push(`${longFunctions.length} functions exceed 30 lines`);
  if (metrics.comments === 0 && metrics.lines > 50) warnings.push('no comments in a non-trivial file');
  if (metrics.functionCount > 10) warnings.push('high function count — file may have too many responsibilities');

  let verdict: string;
  if (warnings.length === 0) verdict = 'clean';
  else if (warnings.length <= 2) verdict = 'manageable';
  else if (warnings.length <= 4) verdict = 'concerning';
  else verdict = 'chaotic';

  return {
    fileName: metrics.fileName,
    functionCount: metrics.functionCount,
    avgFunctionSize: metrics.avgFunctionSize,
    largestFunction,
    longFunctions,
    maxNesting,
    deeplyNestedLines,
    warnings,
    verdict,
  };
}
