import type { TypedArray } from './types/typedArray';
import { getObjectTag } from './utils/getObjectTag';

const equal = <T>(a: T, b: T): boolean => {
  if (a === b || Object.is(a, b)) return true;

  if (typeof a !== typeof b) return false;

  if (typeof a === 'object') {
    // Objects are Array
    // if (Array.isArray(a))

    switch (getObjectTag(a)) {
      case 'Date':
        return (a as Date).valueOf() === (b as Date).valueOf();

      case 'Set': {
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

      case 'Array': {
        if ((a as Array<any>).length !== (b as Array<any> as Array<any>).length)
          return false;
        for (const i in a) {
          if (!equal(a[i], b[i])) return false;
        }
        return true;
      }

      case 'Map': {
        if ((a as Map<any, any>).size !== (b as Map<any, any>).size)
          return false;
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

      case 'RegExp':
        return (
          (a as RegExp).source === (b as RegExp).source &&
          (a as RegExp).flags === (b as RegExp).flags
        );

      case 'ArrayBuffer': {
        if ((a as ArrayBuffer).byteLength !== (b as ArrayBuffer).byteLength)
          return false;
        return equal(
          new Uint8Array(a as ArrayBuffer),
          new Uint8Array(b as ArrayBuffer),
        );
      }

      case 'Error':
        return (
          (a as Error).name === (b as Error).name &&
          (a as Error).message === (b as Error).message
        );

      case 'DataView': {
        if (
          (a as DataView).byteLength !== (b as DataView).byteLength ||
          (a as DataView).byteOffset !== (b as DataView).byteOffset
        )
          return false;
        return equal(
          new Uint8Array((a as DataView).buffer),
          new Uint8Array((b as DataView).buffer),
        );
      }

      case 'Object': {
        const aKeys = Object.keys(a as Object);
        const bKeys = Object.keys(b as Object);

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

      default: {
        // Object is TypedArray
        if (ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
          if (
            (a as unknown as TypedArray).length !==
            (b as unknown as TypedArray).length
          )
            return false;
          for (const i in a as unknown as TypedArray) {
            if (
              !equal(
                (a as unknown as TypedArray)[i],
                (b as unknown as TypedArray)[i],
              )
            )
              return false;
          }
          return true;
        }
      }
    }
  }
  return a !== a && b !== b; // return true if NaN
};

export default equal;
