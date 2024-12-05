export type TestedConstructor =
  | Array<any>
  | Date
  | Set<any>
  | Map<any, any>
  // | WeakSet<any>
  // | WeakMap<any, any>
  | RegExp
  | ArrayBuffer
  | Error
  | DataView
  | Object;
