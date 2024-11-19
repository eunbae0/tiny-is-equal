import type { TestedTags } from '../types/testedTag';

export const getObjectTag = (a: any): TestedTags => {
  return Object.prototype.toString.call(a).slice(8, -1) as TestedTags; // 8 = '[object ', -1 = ']'
};
