import { run, bench, summary } from 'mitata';
import { complexObj1, complexObj2 } from '../constant.cjs';

import { isEqual as underscoreIsEqual } from 'underscore';
import lodash from 'lodash';
const { isEqual: lodashIsEqual } = lodash;
import deepEql from 'deep-eql';
import deepEqual from 'deep-equal';
import { isEqual as esToolkitisEqual } from 'es-toolkit';
import { dequal } from 'dequal';
import fastDeepEqual from 'fast-deep-equal';
import tinyIsEqual from '../../dist/index.js';

summary(() => {
  bench('underscore', () => {
    return underscoreIsEqual(complexObj1, complexObj2);
  });
  bench('lodash', () => {
    return lodashIsEqual(complexObj1, complexObj2);
  });
  bench('deep-eql', () => {
    return deepEql(complexObj1, complexObj2);
  });
  bench('es-toolkit', () => {
    return esToolkitisEqual(complexObj1, complexObj2);
  });
  bench('dequal', () => {
    return dequal(complexObj1, complexObj2);
  });
  bench('deep-equal', () => {
    return deepEqual(complexObj1, complexObj2);
  });
  bench('fast-deep-equal', () => {
    return fastDeepEqual(complexObj1, complexObj2);
  });
  bench('tiny-is-equal', () => {
    return tinyIsEqual(complexObj1, complexObj2);
  });
});

await run();
