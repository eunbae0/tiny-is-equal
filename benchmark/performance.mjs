import { run, bench, summary } from 'mitata';

import { isEqual as underscoreIsEqual } from 'underscore';
import lodash from 'lodash';
const { isEqual: lodashIsEqual } = lodash;
import deepEql from 'deep-eql';
import deepEqual from 'deep-equal';
import { isEqual as esToolkitisEqual } from 'es-toolkit';
import { dequal } from 'dequal';
import fastDeepEqual from 'fast-deep-equal';
import tinyIsEqual from '../dist/index.js';

const longArray = Array.from({ length: 100 }, (_, i) => i);
const longRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,100}$/g;
const longString =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
const longMap = new Map();

longArray.forEach(value => longMap.set(value.toString(), value));

const sampleObj = {
  a: Number.NaN,
  b: longString,
  c: longArray,
  d: new Set(longArray),
  e: longMap,
  f: longRegex,
  g: new Error(longString),
  h: new Date('2000-01-01'),
  i: new Uint8Array(longArray).buffer,
  j: new Uint8Array(longArray),
  k: new DataView(new Uint8Array(longArray).buffer),
  l: new WeakSet(),
  m: new WeakMap(),
  n: tinyIsEqual,
};
const sampleObj2 = {
  a: Number.NaN,
  b: longString,
  c: longArray,
  d: new Set(longArray),
  e: longMap,
  f: longRegex,
  g: new Error(longString),
  h: new Date('2000-01-01'),
  i: new Uint8Array(longArray).buffer,
  j: new Uint8Array(longArray),
  k: new DataView(new Uint8Array(longArray).buffer),
  l: new WeakSet(),
  m: new WeakMap(),
  n: tinyIsEqual,
};

const obj1 = {
  ...sampleObj,
  nestedObj: { ...sampleObj, deepNestedObj: { ...sampleObj } },
};
const obj2 = {
  ...sampleObj2,
  nestedObj: { ...sampleObj2, deepNestedObj: { ...sampleObj2 } },
};

console.log(obj1.m === obj2.m);

console.log('underscore: ', underscoreIsEqual(obj1, obj2));
// console.log('lodash: ', lodashIsEqual(obj1, obj2));
console.log('deep-eql: ', deepEql(obj1, obj2));
console.log('deep-equal: ', deepEqual(obj1, obj2)); // false
console.log('es-toolkit: ', esToolkitisEqual(obj1, obj2));
console.log('dequal: ', dequal(obj1, obj2));
console.log('fast-deep-equal: ', fastDeepEqual(obj1, obj2));
console.log('tiny-is-equal: ', tinyIsEqual(obj1, obj2));

summary(() => {
  bench('underscore', () => {
    return underscoreIsEqual(obj1, obj2);
  });
  bench('lodash', () => {
    return lodashIsEqual(obj1, obj2);
  });
  bench('deep-eql', () => {
    return deepEql(obj1, obj2);
  });
  bench('deep-equal', () => {
    return deepEqual(obj1, obj2);
  });
  bench('es-toolkit', () => {
    return esToolkitisEqual(obj1, obj2);
  });
  bench('dequal', () => {
    return dequal(obj1, obj2);
  });
  bench('fast-deep-equal', () => {
    return fastDeepEqual(obj1, obj2);
  });
  bench('tiny-is-equal', () => {
    return tinyIsEqual(obj1, obj2);
  });
});

await run();
