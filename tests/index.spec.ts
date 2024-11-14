import { equal } from '../src';
import { describe, it, expect } from 'vitest';

describe('equal', () => {
  // Primitive Values
  it('should return true when comparing equal primitive values', () => {
    expect(equal(1, 1)).toBe(true);
    expect(equal(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)).toBe(true);
    expect(equal(BigInt('0x1fffffffffffff'), BigInt('0x1fffffffffffff'))).toBe(
      true,
    );
    expect(equal(BigInt('0x1fffffffffffff'), BigInt(9007199254740991))).toBe(
      true,
    );
    expect(equal(true, true)).toBe(true);
    expect(equal('', '')).toBe(true);
    expect(equal('foo', 'foo')).toBe(true);
    expect(equal(undefined, undefined)).toBe(true);
    expect(equal(null, null)).toBe(true);
  });

  it('should return true when comparing diffrent primitive values', () => {
    expect(equal(1, 2)).toBe(false);
    expect(equal(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)).toBe(false);
    expect(equal(BigInt('0x1fffffffffffff'), BigInt(0))).toBe(false);
    expect(equal(true, false)).toBe(false);
    expect(equal('', 'foo')).toBe(false);
    expect(equal('foo', 'bar')).toBe(false);
    expect(equal(undefined, null)).toBe(false);
  });

  it('should return true when comparing NaN comparisons', () => {
    expect(equal(Number.NaN, Number.NaN)).toBe(true);
  });

  it('should return true when comparing +0 and -0 comparisons', () => {
    expect(equal(+0, -0)).toBe(true);
  });

  // Objects
  // // Arrays
  it('should return true when comparing deeply equal arrays', () => {
    const arr1 = [1, 2, 3, 4];
    const arr2 = [1, 2, 3, 4];

    expect(equal(arr1, arr2)).toBe(true);
  });

  it('should return false when comparing diffrent arrays', () => {
    const arr1 = [1, 2, 3, 4];
    const arr2 = [1, 2, 3, 5];

    expect(equal(arr1, arr2)).toBe(false);
  });

  it('should return false when comparing arrays of different lengths', () => {
    const arr1 = [1, 2, 3];
    const arr2 = [1, 2];

    expect(equal(arr1, arr2)).toBe(false);
  });

  // // Dates
  it('should return true when comparing equal Date objects', () => {
    const date1 = new Date('2000-01-01');
    const date2 = new Date('2000-01-01');
    expect(equal(date1, date2)).toBe(true);
  });

  it('should return false when comparing different Date objects', () => {
    const date1 = new Date('2000-01-01');
    const date2 = new Date('2000-01-02');
    expect(equal(date1, date2)).toBe(false);
  });

  // // Sets
  it('should return true when comparing equal Sets', () => {
    const set1 = new Set();
    const set2 = new Set();

    expect(equal(set1, set2)).toBe(true);

    set1.add(1);
    set2.add(1);

    expect(equal(set1, set2)).toBe(true);
  });

  it('should return false when comparing diffrent Sets', () => {
    const set1 = new Set();
    const set2 = new Set();
    set1.add(1);
    set2.add(2);

    expect(equal(set1, set2)).toBe(false);
  });

  it('should return false when comparing Sets of different lengths', () => {
    const set1 = new Set();
    const set2 = new Set();
    set1.add(1);
    set1.add(2);
    set2.add(1);

    expect(equal(set1, set2)).toBe(false);
  });

  it('should return true when comparing Sets with duplicate objects', () => {
    const set1 = new Set();
    const set2 = new Set();
    set1.add({ a: 1 });
    set1.add({ b: 1 });
    set2.add({ a: 1 });
    set2.add({ b: 1 });

    expect(equal(set1, set2)).toBe(true);

    set1.add({ a: 1 });
    set2.add({ a: 1 });

    expect(equal(set1, set2)).toBe(true);
  });

  // // Maps
  it('should return true when comparing equal Maps', () => {
    const map1 = new Map();
    const map2 = new Map();

    expect(equal(map1, map2)).toBe(true);

    map1.set('a', 1);
    map2.set('a', 1);

    expect(equal(map1, map2)).toBe(true);
  });

  it('should return false when comparing diffrent Maps', () => {
    const map1 = new Map();
    const map2 = new Map();
    map1.set('a', 1);
    map2.set('a', 2);

    expect(equal(map1, map2)).toBe(false);
  });

  it('should return false when comparing Maps of different lengths', () => {
    const map1 = new Map();
    const map2 = new Map();
    map1.set('a', 1);
    map1.set('b', 2);
    map2.set('a', 1);

    expect(equal(map1, map2)).toBe(false);
  });

  it('should return true when comparing Maps with duplicate objects', () => {
    const map1 = new Map();
    const map2 = new Map();
    map1.set(1, { a: 1 });
    map1.set('1', { b: 1 });
    map2.set(1, { a: 1 });
    map2.set('1', { b: 1 });

    expect(equal(map1, map2)).toBe(true);

    map1.set(1, { a: 1 });
    map2.set(1, { a: 1 });

    expect(equal(map1, map2)).toBe(true);
  });

  // // RegExp
  it('should return true when comparing equal RegExp', () => {
    const regex1 = /(?:)/g;
    const regex2 = /(?:)/g;

    expect(equal(regex1, regex2)).toBe(true);
  });

  it('should return false when comparing diffrent RegExp', () => {
    const regex1 = /(?:)/g;
    const regex2 = /(?:foo)/g;

    expect(equal(regex1, regex2)).toBe(false);
  });

  // // ArrayBuffer
  it('should return true when comparing equal ArrayBuffers', () => {
    const buffer1 = new Uint8Array([1, 2, 3]).buffer;
    const buffer2 = new Uint8Array([1, 2, 3]).buffer;

    expect(equal(buffer1, buffer2)).toBe(true);
  });

  it('should return false when comparing diffrent ArrayBuffers', () => {
    const buffer1 = new Uint8Array([1, 2, 3]).buffer;
    const buffer2 = new Uint32Array([1, 2, 3]).buffer;

    expect(equal(buffer1, buffer2)).toBe(false);
  });

  it('should return false when comparing diffrent ArrayBuffers of different lengths', () => {
    const buffer1 = new Uint16Array([1, 2, 3, 4]).buffer;
    const buffer2 = new Uint16Array([1, 2]).buffer;

    expect(equal(buffer1, buffer2)).toBe(false);
  });

  // // TypedArrays
  it('should return true when comparing equal TypedArrays', () => {
    const buffer1 = new Uint8Array([1, 2, 3]);
    const buffer2 = new Uint8Array([1, 2, 3]);

    expect(equal(buffer1, buffer2)).toBe(true);
  });

  it('should return false when comparing diffrent TypedArrays', () => {
    const buffer1 = new Uint8Array([1, 2, 3]);
    const buffer2 = new Uint8Array([1, 2, 4]);

    expect(equal(buffer1, buffer2)).toBe(false);
  });

  it('should return false when comparing diffrent TypedArrays of different lengths', () => {
    const buffer1 = new Uint16Array([1, 2, 3, 4]);
    const buffer2 = new Uint16Array([1, 2]);

    expect(equal(buffer1, buffer2)).toBe(false);
  });

  // // DataViews
  it('should return true when comparing equal DataViews', () => {
    const buffer1 = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]).buffer;
    const buffer2 = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]).buffer;
    const view1 = new DataView(buffer1, 6, 2);
    const view2 = new DataView(buffer2, 6, 2);

    expect(equal(view1, view2)).toBe(true);
  });

  it('should return false when comparing diffrent DataViews offset', () => {
    const buffer1 = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]).buffer;
    const buffer2 = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]).buffer;
    const view1 = new DataView(buffer1, 6, 2);
    const view2 = new DataView(buffer2, 4, 4);

    expect(equal(view1, view2)).toBe(false);
  });

  it('should return false when comparing diffrent DataViews of buffer', () => {
    const buffer1 = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]).buffer;
    const buffer2 = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 9]).buffer;
    const view1 = new DataView(buffer1, 6, 2);
    const view2 = new DataView(buffer2, 6, 2);

    expect(equal(view1, view2)).toBe(false);
  });

  // // Error
  it('should return true when comparing equal Errors', () => {
    const err1 = new Error('error!');
    const err2 = new Error('error!');

    expect(equal(err1, err2)).toBe(true);
  });

  it('should return false when comparing diffrent Errors', () => {
    const err1 = new Error('error!');
    const err2 = new Error('error!!');

    expect(equal(err1, err2)).toBe(false);
  });

  // // Deep Object
  it('should return true when comparing deeply equal objects', () => {
    const obj1 = { a: 1, b: { c: 1 } };
    const obj2 = { a: 1, b: { c: 1 } };

    expect(equal(obj1, obj2)).toBe(true);
  });

  it('should return false when comparing diffrent objects', () => {
    const obj1 = { a: 1, b: { c: 1 } };
    const obj2 = { a: 1, b: { c: 2 } };

    expect(equal(obj1, obj2)).toBe(false);
  });
});
