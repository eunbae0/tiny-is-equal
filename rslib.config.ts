import type { LibConfig } from '@rslib/core';
import { defineConfig } from '@rslib/core';

const common: LibConfig = {
  syntax: 'es2015',
  output: {
    minify: {
      jsOptions: {
        minimizerOptions: {
          compress: true,
          module: true,
        },
      },
    },
  },
};

export default defineConfig({
  lib: [
    {
      format: 'esm',
      dts: true,
      ...common,
    },
    {
      format: 'cjs',
      ...common,
    },
  ],
});
