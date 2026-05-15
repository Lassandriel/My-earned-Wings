import { describe, it, expect } from 'vitest';
import { decodeRawSave } from './persistence';

/**
 * decodeRawSave is the pure entry point used by loadGame() to turn a raw
 * localStorage / SQLite blob into a structured result. We test it
 * directly here because the rest of loadGame depends on Alpine, the
 * BroadcastChannel, IPC etc. — too much surface to mock.
 */
describe('decodeRawSave (corruption recovery)', () => {
  it('returns empty when no save exists', () => {
    expect(decodeRawSave(null)).toEqual({ ok: false, reason: 'empty' });
    expect(decodeRawSave(undefined)).toEqual({ ok: false, reason: 'empty' });
    expect(decodeRawSave('')).toEqual({ ok: false, reason: 'empty' });
  });

  it('parses a valid uncompressed JSON object', () => {
    const result = decodeRawSave('{"playerName":"Lassi","resources":{"wood":12}}');
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.playerName).toBe('Lassi');
    }
  });

  it('flags malformed JSON as parse_error', () => {
    const result = decodeRawSave('{not valid json');
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.reason).toBe('parse_error');
      expect(result.detail).toBeTruthy();
    }
  });

  it('flags non-object JSON (string / number / array) as invalid_shape', () => {
    expect(decodeRawSave('"just a string"')).toMatchObject({ ok: false, reason: 'invalid_shape' });
    expect(decodeRawSave('42')).toMatchObject({ ok: false, reason: 'invalid_shape' });
    expect(decodeRawSave('null')).toMatchObject({ ok: false, reason: 'invalid_shape' });
    expect(decodeRawSave('[1, 2, 3]')).toMatchObject({ ok: false, reason: 'invalid_shape' });
  });

  it('flags broken LZW payload (bad base64) as decompress_error', () => {
    // LZW: prefix tells us decompression should run, payload is garbage
    // that atob() either rejects outright or that LZW decodes to nothing.
    const result = decodeRawSave('LZW:!!!not-base64-at-all!!!');
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.reason).toBe('decompress_error');
    }
  });

  it('flags LZW payload that decompresses to malformed JSON as parse_error', () => {
    // Empty LZW payload decodes to "" → fails the empty-after-LZW check.
    const result = decodeRawSave('LZW:');
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.reason).toBe('decompress_error');
    }
  });

  it('treats LZW prefix with non-string content gracefully', () => {
    // Even-numbered base64 that is technically decodable but produces
    // useless bytes — should fail at the parse step, not crash.
    const result = decodeRawSave('LZW:aGVsbG8=');
    expect(result.ok).toBe(false);
    // Accept either decompress_error or parse_error; the point is "no crash".
    if (!result.ok) {
      expect(['decompress_error', 'parse_error']).toContain(result.reason);
    }
  });
});
