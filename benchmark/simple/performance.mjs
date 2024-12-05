import { run, bench, summary } from 'mitata';
import { simpleObj1, simpleObj2 } from '../constant.mjs';

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
    return underscoreIsEqual(simpleObj1, simpleObj2);
  });
  bench('lodash', () => {
    return lodashIsEqual(simpleObj1, simpleObj2);
  });
  bench('deep-eql', () => {
    return deepEql(simpleObj1, simpleObj2);
  });
  bench('es-toolkit', () => {
    return esToolkitisEqual(simpleObj1, simpleObj2);
  });
  bench('dequal', () => {
    return dequal(simpleObj1, simpleObj2);
  });
  bench('deep-equal', () => {
    return deepEqual(simpleObj1, simpleObj2);
  });
  bench('fast-deep-equal', () => {
    return fastDeepEqual(simpleObj1, simpleObj2);
  });
  bench('tiny-is-equal', () => {
    return tinyIsEqual(simpleObj1, simpleObj2);
  });
});

await run();
