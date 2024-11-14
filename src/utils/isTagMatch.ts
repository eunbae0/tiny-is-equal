import type { TestedTags } from '../types/testedTag';

export const isTagMatch = (a: any, tagName: TestedTags) => {
  return Object.prototype.toString.call(a) === `[object ${tagName}]`;
};
