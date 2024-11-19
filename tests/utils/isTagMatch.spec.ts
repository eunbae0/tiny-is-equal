import { test, expect } from 'vitest';
import { getObjectTag } from '../../src/utils/getObjectTag';

test('getObjectTag', () => {
  expect(getObjectTag({ a: 1 })).toBe('Object');
  expect(getObjectTag(/(?:)/)).toBe('RegExp');
  expect(getObjectTag(new Set())).toBe('Set');
  expect(getObjectTag(new WeakSet())).toBe('WeakSet');
  expect(getObjectTag(new Map())).toBe('Map');
  expect(getObjectTag(new WeakMap())).toBe('WeakMap');
  expect(getObjectTag(new Date())).toBe('Date');
  expect(getObjectTag(new Error())).toBe('Error');
});
