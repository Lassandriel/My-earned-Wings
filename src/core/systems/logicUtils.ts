/**
 * Shared Logic Utilities for Requirements and Path Resolution
 */

export const resolvePath = (obj: any, path: string): any => {
  if (!path) return obj;
  return path.split('.').reduce((prev, curr) => {
    return prev ? prev[curr] : undefined;
  }, obj);
};

export const checkRequirement = (game: any, path: string, rule: any): boolean => {
  let actual = resolvePath(game, path);

  // Treat undefined as null for flags to avoid path errors on new save games
  if (actual === undefined && path.startsWith('flags.')) {
    actual = null;
  }

  if (actual === undefined) {
    // In production this is a warning, in check-logic we might want to catch it
    actual = null;
  }

  if (typeof rule !== 'object' || rule === null) {
    return actual === rule;
  }

  const { op, val } = rule;
  switch (op) {
    case '>=':
      return actual >= val;
    case '<=':
      return actual <= val;
    case '>':
      return actual > val;
    case '<':
      return actual < val;
    case '!=':
      return actual !== val;
    case 'includes':
      return Array.isArray(actual) && actual.includes(val);
    case 'not_includes':
      return Array.isArray(actual) && !actual.includes(val);
    default:
      return actual === val;
  }
};
