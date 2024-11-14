# tiny-deep-equal

> Tiny & Fast deep-equal check with various ES6 objects.

[![NPM version](https://img.shields.io/npm/v/tiny-deep-equal.svg?style=flat)](https://www.npmjs.com/package/tiny-deep-equal) [![monthly downloads](https://img.shields.io/npm/dm/tiny-deep-equal.svg?maxAge=3600)](https://npmjs.com/package/tiny-deep-equal)
<a href="https://pkg-size.dev/tiny-deep-equal"><img src="https://pkg-size.dev/badge/bundle/1359" title="Bundle size for tiny-deep-equal"></a> [![bundle size](http://img.badgesize.io/https://unpkg.com/tiny-deep-equal/dist/index.js?compression=gzip)](https://unpkg.com/tiny-deep-equal/dist/index.js)

- **No dependencies.**
- **Tiny bundle size.** (NPM Minified: **1.4kB**, Gzipped: **586B**)
- Support for both **CJS and ESM**.
- **Typescript** based code, support type declarations.
- Comprehensive test coverage.

## Install

- Requirements: `Node>=16.19.0`

```shell
$ yarn add tiny-deep-equal // yarn
$ npm install tiny-deep-equal --save // npm
$ pnpm install tiny-deep-equal // pnpm
```

## Usage

```javascript
// esm
import equal from 'tiny-deep-equal';

equal({ a: 1, b: { c: 1 } }, { a: 1, b: { c: 1 } }) // true

// cjs
const equal = require('tiny-deep-equal');

equal({ a: 1, b: { c: 1 } }, { a: 1, b: { c: 1 } }) // true
```

tiny-deep-equal supports various objects with ES6.

### +0 & -0

```javascript
equal(+0, -0) // true
```

### Set & Map

```javascript
const set1 = new Set([1, 2, 3]);
const set2 = new Set([1, 2, 3]);

equal(set1, set2) // true

const map1 = new Map();
const map2 = new Map();

map1.set('a', 1);
map2.set('a', 1);

equal(map1, map2) // true
```

### RegExp

```javascript
const regex1 = /(?:foo)/g;
const regex2 = /(?:foo)/g;

expect(equal(regex1, regex2)) // true
```

### ArrayBuffer

```javascript
const buffer1 = new Uint8Array([1, 2, 3]);
const buffer2 = new Uint8Array([1, 2, 3]);

expect(equal(buffer1, buffer2)) // true
```

### Error

```javascript
const err1 = new Error('error!');
const err2 = new Error('error!');

expect(equal(err1, err2)) // true
```

## BenchMark

```shell
$ pnpm run benchmark:performance
```

## Test

```shell
$ pnpm run test
```

## License

[MIT](https://github.com/eunbae0/tiny-deep-equal/blob/main/LICENSE)
