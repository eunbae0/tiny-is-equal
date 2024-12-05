import type { TestedConstructor } from './types/testedConstructor';
import type { TypedArray } from './types/typedArray';

const equal = <T>(a: T, b: T): boolean => {
  if (a === b || Object.is(a, b)) return true;

  if (typeof a !== typeof b) return false;

  // Objects are Array
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!equal(a[i], b[i])) return false;
    }
    return true;
  }

  if ((a as Object).constructor !== (b as Object).constructor) return false;

  switch ((a as Object).constructor as TestedConstructor) {
    case Date:
      return (a as Date).valueOf() === (b as Date).valueOf();

    case Set: {
      const aSet = a as Set<any>;
      const bSet = b as Set<any>;
      if (aSet.size !== bSet.size) return false;

      for (const aValue of aSet) {
        if (typeof aValue === 'object' && aValue !== null) {
          let found = false;
          for (const bValue of bSet) {
            if (typeof bValue === 'object' && equal(aValue, bValue)) {
              found = true;
              break;
            }
          }
          if (!found) return false;
        } else {
          if (!bSet.has(aValue)) return false;
        }
      }
      return true;
    }

    case Map: {
      const aMap = a as Map<any, any>;
      const bMap = b as Map<any, any>;
      if (aMap.size !== bMap.size) return false;
      for (const [key, value] of aMap) {
        if (!bMap.has(key) || !equal(value, bMap.get(key))) return false;
      }
      return true;
    }

    // case WeakSet:
    // case WeakMap:
    //   return a === b;

    case RegExp:
      return (
        (a as RegExp).source === (b as RegExp).source &&
        (a as RegExp).flags === (b as RegExp).flags
      );

    case ArrayBuffer:
      if ((a as ArrayBuffer).byteLength !== (b as ArrayBuffer).byteLength)
        return false;
      return equal(
        new Uint8Array(a as ArrayBuffer),
        new Uint8Array(b as ArrayBuffer),
      );

    case Error: {
      const aError = a as Error;
      const bError = b as Error;
      return aError.name === bError.name && aError.message === bError.message;
    }

    case DataView: {
      const aView = a as DataView;
      const bView = b as DataView;
      if (
        aView.byteLength !== bView.byteLength ||
        aView.byteOffset !== bView.byteOffset
      )
        return false;
      for (let i = 0; i < aView.byteLength; i++) {
        if (aView.getUint8(i) !== bView.getUint8(i)) return false;
      }
      return true;
    }

    case Function: {
      const aFunc = a as Function;
      const bFunc = b as Function;
      return aFunc.toString() === bFunc.toString();
    }

    case Object: {
      const aObj = a as Object;
      const bObj = b as Object;
      const aKeys = Object.keys(aObj);
      if (aKeys.length !== Object.keys(bObj).length) return false;

      for (const key in aObj) {
        if (
          !Object.hasOwn(bObj, key) ||
          !equal((aObj as any)[key], (bObj as any)[key])
        ) {
          return false;
        }
      }

      return true;
    }

    default:
      // Object is TypedArray
      if (ArrayBuffer.isView(a)) {
        const aTyped = a as unknown as TypedArray;
        const bTyped = b as unknown as TypedArray;
        if (aTyped.length !== bTyped.length) return false;
        for (let i = 0; i < aTyped.length; i++) {
          if (aTyped[i] !== bTyped[i]) return false;
        }
        return true;
      }
  }

  return a !== a && b !== b; // return true if NaN
};

export default equal;
