import { test, expect } from 'vitest';
import { isTagMatch } from '../../src/utils/isTagMatch';

test('isTagMatch', () => {
  expect(isTagMatch({ a: 1 }, 'Object')).toBe(true);
  expect(isTagMatch(/(?:)/, 'RegExp')).toBe(true);
  expect(isTagMatch(new Set(), 'Set')).toBe(true);
  expect(isTagMatch(new WeakSet(), 'WeakSet')).toBe(true);
  expect(isTagMatch(new Map(), 'Map')).toBe(true);
  expect(isTagMatch(new WeakMap(), 'WeakMap')).toBe(true);
  expect(isTagMatch(new Date(), 'Date')).toBe(true);
  expect(isTagMatch(new Error(), 'Error')).toBe(true);
});
