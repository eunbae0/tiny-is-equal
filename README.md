# tiny-is-equal

> Tiny & Fast is-equal check with various ES6 objects.

[![NPM version](https://img.shields.io/npm/v/tiny-is-equal.svg?style=flat)](https://www.npmjs.com/package/tiny-is-equal) [![monthly downloads](https://img.shields.io/npm/dm/tiny-is-equal.svg?maxAge=3600)](https://npmjs.com/package/tiny-is-equal)
<a href="https://pkg-size.dev/tiny-is-equal"><img src="https://pkg-size.dev/badge/bundle/1359" title="Bundle size for tiny-is-equal"></a> [![bundle size](http://img.badgesize.io/https://unpkg.com/tiny-is-equal/dist/index.js?compression=gzip)](https://unpkg.com/tiny-is-equal/dist/index.js)

- **No dependencies.**
- **Tiny bundle size.** (NPM Minified: **1.4kB**, Gzipped: **586B**)
- Support for both **CJS and ESM**.
- **Typescript** based code, support type declarations.
- Comprehensive test coverage.

## Install

- Requirements: `Node>=16.19.0`

```shell
$ yarn add tiny-is-equal # yarn
$ npm install tiny-is-equal --save # npm
$ pnpm install tiny-is-equal # pnpm
```

## Usage

```javascript
// esm
import isEqual from 'tiny-is-equal';

isEqual({ a: 1, b: { c: 1 } }, { a: 1, b: { c: 1 } }) // true

// cjs
const isEqual = require('tiny-is-equal');

isEqual({ a: 1, b: { c: 1 } }, { a: 1, b: { c: 1 } }) // true
```

tiny-is-equal supports various objects with ES6.

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

## BenchMark

```shell
$ pnpm run benchmark:performance
```

## Test

```shell
$ pnpm run test
```

## License

[MIT](https://github.com/eunbae0/tiny-is-equal/blob/main/LICENSE)
