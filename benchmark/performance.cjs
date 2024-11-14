const Benchmark = require('benchmark');
const suite = new Benchmark.Suite();

const { isEqual: underscoreIsEqual } = require('underscore');
const { isEqual: lodashIsEqual } = require('lodash');
const { equals: ramdaEquals } = require('ramda');
const { isEqual: esToolkitisEqual } = require('es-toolkit');
const fastDeepEqual = require('fast-deep-equal');
const tinyDeepEqual = require('../dist/index.cjs').default;

const longArray = Array.from({ length: 1000000 }, (_, i) => i);
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
};

const obj1 = {
  ...sampleObj,
  nestedObj: { ...sampleObj, deepNestedObj: { ...sampleObj } },
};
const obj2 = {
  ...sampleObj,
  nestedObj: { ...sampleObj, deepNestedObj: { ...sampleObj } },
};

console.log('underscore: ', underscoreIsEqual(obj1, obj2));
console.log('lodash: ', lodashIsEqual(obj1, obj2));
console.log('ramda: ', ramdaEquals(obj1, obj2));
console.log('es-toolkit: ', esToolkitisEqual(obj1, obj2));
console.log('fast-deep-equal: ', fastDeepEqual(obj1, obj2));
console.log('tiny-deep-equal: ', tinyDeepEqual(obj1, obj2));

suite.add('tiny-deep-equal', () => {
  return tinyDeepEqual(obj1, obj2);
});
suite.add('fast-deep-equal', () => {
  return fastDeepEqual(obj1, obj2);
});
suite.add('underscore', () => {
  return underscoreIsEqual(obj1, obj2);
});
suite.add('lodash', () => {
  return lodashIsEqual(obj1, obj2);
});
suite.add('es-toolkit', () => {
  return esToolkitisEqual(obj1, obj2);
});
suite.add('ramda', () => {
  return ramdaEquals(obj1, obj2);
});

suite
  .on('cycle', event => console.log(String(event.target)))
  .run({ async: true });
