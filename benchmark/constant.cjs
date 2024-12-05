const tinyIsEqual = require('../dist/index.cjs').default;

// Simple

const simpleMap = new Map();

Array.from({ length: 5 }, (_, i) => i).forEach(value =>
  simpleMap.set(value.toString(), value),
);

const sampleSimpleObj = {
  a: Number.NaN,
  b: 100,
  c: 'string',
  d: [1, 2, 3, 4, 5, 6, 7, 8],
  e: new Set([1, 2, 3, 4, 5]),
  f: simpleMap,
  g: /^(?=.*[A-Z])/g,
  h: new Error('error'),
  i: new Date('2000-01-01'),
  j: new Uint8Array([1, 2, 3, 4, 5]).buffer,
  k: new Uint8Array([1, 2, 3, 4, 5]),
  l: new DataView(new Uint8Array([1, 2, 3, 4, 5]).buffer),
  m: tinyIsEqual,
};
const sampleSimpleObj2 = {
  a: Number.NaN,
  b: 100,
  c: 'string',
  d: [1, 2, 3, 4, 5, 6, 7, 8],
  e: new Set([1, 2, 3, 4, 5]),
  f: simpleMap,
  g: /^(?=.*[A-Z])/g,
  h: new Error('error'),
  i: new Date('2000-01-01'),
  j: new Uint8Array([1, 2, 3, 4, 5]).buffer,
  k: new Uint8Array([1, 2, 3, 4, 5]),
  l: new DataView(new Uint8Array([1, 2, 3, 4, 5]).buffer),
  m: tinyIsEqual,
};

const simpleObj1 = { ...sampleSimpleObj };
const simpleObj2 = { ...sampleSimpleObj2 };

// Complex

const longArray = Array.from({ length: 100 }, (_, i) => i);
const longRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,100}$/g;
const longString =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
const longMap = new Map();

longArray.forEach(value => longMap.set(value.toString(), value));

const sampleComplexObj = {
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
  // l: new WeakSet(),
  // m: new WeakMap(),
  n: tinyIsEqual,
};
const sampleComplexObj2 = {
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
  // l: new WeakSet(),
  // m: new WeakMap(),
  n: tinyIsEqual,
};

const complexObj1 = {
  ...sampleComplexObj,
  nestedObj: { ...sampleComplexObj, deepNestedObj: { ...sampleComplexObj } },
};
const complexObj2 = {
  ...sampleComplexObj2,
  nestedObj: {
    ...sampleComplexObj2,
    deepNestedObj: { ...sampleComplexObj2 },
  },
};

module.exports = { simpleObj1, simpleObj2, complexObj1, complexObj2 };
