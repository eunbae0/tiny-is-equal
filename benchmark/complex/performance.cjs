const { complexObj1, complexObj2 } = require('../constant.cjs');

const Benchmark = require('benchmark');
const suite = new Benchmark.Suite();

const { isEqual: underscoreIsEqual } = require('underscore');
const { isEqual: lodashIsEqual } = require('lodash');
const { isEqual: esToolkitisEqual } = require('es-toolkit');
const { dequal } = require('dequal');
const deepEqual = require('deep-equal');
const fastDeepEqual = require('fast-deep-equal');
const tinyIsEqual = require('../../dist/index.cjs').default;

suite.add('tiny-is-equal', () => {
  return tinyIsEqual(complexObj1, complexObj2);
});
suite.add('dequal', () => {
  return dequal(complexObj1, complexObj2);
});
suite.add('underscore.isEqual', () => {
  return underscoreIsEqual(complexObj1, complexObj2);
});
suite.add('fast-deep-equal', () => {
  return fastDeepEqual(complexObj1, complexObj2);
});
suite.add('es-toolkit.isEqual', () => {
  return esToolkitisEqual(complexObj1, complexObj2);
});
suite.add('lodash.isEqual', () => {
  return lodashIsEqual(complexObj1, complexObj2);
});
suite.add('deep-equal', () => {
  return deepEqual(complexObj1, complexObj2);
});

suite
  .on('cycle', event => console.log(String(event.target)))
  .run({ async: true });
