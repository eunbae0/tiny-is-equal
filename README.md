# tiny-equal

> Tiny & Fastest is-equal check with various ES6 objects.

[![NPM version](https://img.shields.io/npm/v/tiny-equal.svg?style=flat)](https://www.npmjs.com/package/tiny-equal) [![monthly downloads](https://img.shields.io/npm/dm/tiny-equal.svg?maxAge=3600)](https://npmjs.com/package/tiny-equal)
<a href="https://pkg-size.dev/tiny-equal"><img src="https://pkg-size.dev/badge/bundle/1208" title="Bundle size for tiny-equal"></a> [![bundle size](http://img.badgesize.io/https://unpkg.com/tiny-equal/dist/index.js?compression=gzip)](https://unpkg.com/tiny-equal/dist/index.js)

- **No dependencies.**
- **Tiny bundle size.** (NPM Minified: **1.2kB**, Gzipped: **574B**)
- **[Fastest performance](./benchmark/README.md)** among other similar packages.
- Support for both **CJS and ESM**.
- **Typescript** based code, support type declarations.
- Comprehensive [test coverage](./tests/index.spec.ts).

#### TODO

- [ ] Support for `WeakSet` & `WeakMap`.

## Install

```shell
$ npm install tiny-equal --save # npm
$ yarn add tiny-equal # yarn
$ pnpm install tiny-equal # pnpm
```

## Usage

```javascript
// esm
import isEqual from 'tiny-equal';

isEqual({ a: 1, b: { c: 1 } }, { a: 1, b: { c: 1 } }) // true

// cjs
const isEqual = require('tiny-equal');

isEqual({ a: 1, b: { c: 1 } }, { a: 1, b: { c: 1 } }) // true
```

tiny-equal supports various objects with ES6.

### +0 & -0

```javascript
isEqual(+0, -0) // true
```

### Set & Map

```javascript
const set1 = new Set([1, 2, 3]);
const set2 = new Set([1, 2, 3]);

isEqual(set1, set2) // true

const map1 = new Map();
const map2 = new Map();

map1.set('a', 1);
map2.set('a', 1);

isEqual(map1, map2) // true
```

### RegExp

```javascript
const regex1 = /(?:foo)/g;
const regex2 = /(?:foo)/g;

expect(isEqual(regex1, regex2)) // true
```

### ArrayBuffer

```javascript
const buffer1 = new Uint8Array([1, 2, 3]);
const buffer2 = new Uint8Array([1, 2, 3]);

expect(isEqual(buffer1, buffer2)) // true
```

### Error

```javascript
const err1 = new Error('error!');
const err2 = new Error('error!');

expect(isEqual(err1, err2)) // true
```

## BenchMarks

### Environment

```shell
clk: ~1.88 GHz
cpu: Apple M2
runtime: node 23.2.0 (arm64-darwin)
```

### Benchmark for simple use case

```diff
$ pnpm run benchmark:simple

+ tiny-equal x 1,123,456 ops/sec ±0.25% (98 runs sampled)
dequal x 774,522 ops/sec ±0.21% (98 runs sampled)
fast-deep-equal x 600,823 ops/sec ±1.01% (92 runs sampled)
underscore.isEqual x 255,012 ops/sec ±0.35% (97 runs sampled)
es-toolkit.isEqual x 217,138 ops/sec ±0.09% (94 runs sampled)
lodash.isEqual x 107,261 ops/sec ±0.24% (98 runs sampled)
deep-equal x 508 ops/sec ±2.77% (73 runs sampled)
```

### Benchmark for complex use case

```diff
$ pnpm run benchmark:complex

+ tiny-equal x 139,032 ops/sec ±0.15% (97 runs sampled)
dequal x 164,526 ops/sec ±0.89% (98 runs sampled)
fast-deep-equal x 55,848 ops/sec ±4.45% (92 runs sampled)
underscore.isEqual x 85,663 ops/sec ±0.72% (95 runs sampled)
lodash.isEqual x 4,708 ops/sec ±3.68% (96 runs sampled)
es-toolkit.isEqual x 30,110 ops/sec ±0.29% (101 runs sampled)
deep-equal x 419 ops/sec ±1.72% (80 runs sampled)
```

You can see the detailed benchmark results in [benchmark](./benchmark/README.md).

## Test

```shell
$ pnpm run test
```

## License

[MIT](https://github.com/eunbae0/tiny-equal/blob/main/LICENSE)
