import { isTagMatch } from './utils/isTagMatch';

type TypedArray =
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array
  | BigInt64Array
  | BigUint64Array;

export const equal = <T>(a: T, b: T): boolean => {
  if (a === b || Object.is(a, b)) return true;

  if (typeof a !== typeof b) return false;

  // Numbers are NaN
  if ((a as Object).constructor === Number) return a !== a && b !== b;

  if (typeof a === 'object' && typeof b === 'object') {
    // Objects are Array
    if (Array.isArray(a)) {
      if (a.length !== (b as Array<any>).length) return false;
      for (const i in a) {
        if (!equal(a[i], (b as Array<any>)[i])) return false;
      }
      return true;
    }

    // Objects are Date
    if (isTagMatch(a, 'Date')) {
      return (a as Date).valueOf() === (b as Date).valueOf();
    }

    // Objects are Set
    if (isTagMatch(a, 'Set')) {
      if ((a as Set<any>).size !== (b as Set<any>).size) return false;
      const bArray = Array.from(b as Set<any>);
      for (const aValue of a as Set<any>) {
        const index = bArray.findIndex(bValue => equal(aValue, bValue));

        if (index === -1) {
          return false;
        }
        bArray.splice(index, 1);
      }
      return true;
    }

    // Objects are Map
    if (isTagMatch(a, 'Map')) {
      if ((a as Map<any, any>).size !== (b as Map<any, any>).size) return false;
      for (const [key, value] of (a as Map<any, any>).entries()) {
        if (
          !(b as Map<any, any>).has(key) ||
          !equal(value, (b as Map<any, any>).get(key))
        ) {
          return false;
        }
      }
      return true;
    }
  }

  // TODO: Objects are WeakSet
  // TOOD: Objects are WeakMap

  // Objects are RegExp
  if (isTagMatch(a, 'RegExp'))
    return (
      (a as RegExp).source === (b as RegExp).source &&
      (a as RegExp).flags === (b as RegExp).flags
    );

  // Objects are TypedArray or DataView
  if (ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
    if (isTagMatch(a, 'DataView')) {
      if (a.byteLength !== b.byteLength || a.byteOffset !== b.byteOffset)
        return false;
      return equal(new Uint8Array(a.buffer), new Uint8Array(b.buffer));
    }

    if (
      (a as unknown as TypedArray).length !==
      (b as unknown as TypedArray).length
    )
      return false;
    for (const i in a as unknown as TypedArray) {
      if (
        !equal((a as unknown as TypedArray)[i], (b as unknown as TypedArray)[i])
      )
        return false;
    }
    return true;
  }

  // Objects are ArrayBuffer
  if (isTagMatch(a, 'ArrayBuffer')) {
    if ((a as ArrayBuffer).byteLength !== (b as ArrayBuffer).byteLength)
      return false;
    return equal(
      new Uint8Array(a as ArrayBuffer),
      new Uint8Array(b as ArrayBuffer),
    );
  }

  if (isTagMatch(a, 'Error'))
    return (
      (a as Error).name === (b as Error).name &&
      (a as Error).message === (b as Error).message
    );

  // Objects are Object
  if (isTagMatch(a, 'Object')) {
    const aKeys = Object.keys(a as any);
    const bKeys = Object.keys(b as any);

    if (aKeys.length !== bKeys.length) {
      return false;
    }

    for (let i = 0; i < aKeys.length; i++) {
      const propKey = aKeys[i];
      const aProp = (a as any)[propKey];

      if (!Object.hasOwn(b as Object, propKey)) {
        return false;
      }

      const bProp = (b as any)[propKey];

      if (!equal(aProp, bProp)) {
        return false;
      }
    }

    return true;
  }

  return false;
};
