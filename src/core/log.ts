/**
 * Tiny dev-side console logger.
 *
 * Wraps the raw `console.log/warn/error` calls scattered across the
 * codebase so that:
 *   1. every line gets a consistent `[MODULE]` prefix
 *   2. debug/info noise is suppressed in production builds (only warns
 *      and errors get through to the player's browser console)
 *   3. when we eventually want to ship logs to a file or remote sink,
 *      there's exactly one place to change.
 *
 * Usage
 * -----
 *
 *     import { makeLogger } from '../core/log';
 *     const log = makeLogger('ACTIONS');
 *
 *     log.debug('cache primed', size);   // dev only
 *     log.info('Registered effect', t);  // dev only
 *     log.warn('cache miss for', key);   // always
 *     log.error('save failed', err);     // always
 *
 * NOT to be confused with `src/core/services/logger.ts` — that's the
 * in-game *event log* the player sees in the right-side panel.
 */

// Vite injects `import.meta.env.DEV` at build time. In Electron / tests
// it may not exist; fall back to "treat as dev" so nothing important
// gets accidentally swallowed in non-Vite contexts.
const isProd = (() => {
  try {
    return (import.meta as any)?.env?.DEV === false;
  } catch {
    return false;
  }
})();

export interface Logger {
  /** Verbose dev-only chatter. Suppressed in production. */
  debug(...args: unknown[]): void;
  /** Standard dev-only info. Suppressed in production. */
  info(...args: unknown[]): void;
  /** Always shown. Use for recoverable problems. */
  warn(...args: unknown[]): void;
  /** Always shown. Use for unexpected failures. */
  error(...args: unknown[]): void;
}

export function makeLogger(prefix: string): Logger {
  const tag = `[${prefix}]`;
  return {
    debug: (...args) => { if (!isProd) console.log(tag, ...args); },
    info:  (...args) => { if (!isProd) console.log(tag, ...args); },
    warn:  (...args) => console.warn(tag, ...args),
    error: (...args) => console.error(tag, ...args),
  };
}
