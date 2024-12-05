# Benchmark

## Environment

```shell
clk: ~1.88 GHz
cpu: Apple M2
runtime: node 23.2.0 (arm64-darwin)
```

- All benchmarks are run in `node --trace-gc` mode.
- Use [benchmark.js](https://github.com/bestiejs/benchmark.js) to run benchmarks in CommonJS environment.
- Use [mitata](https://github.com/evanwashere/mitata) to run benchmarks in ESM environment.

## Benchmark for simple use case (cjs)

```diff
$ pnpm run benchmark:simple

+ tiny-is-equal x 1,123,456 ops/sec ±0.25% (98 runs sampled)
dequal x 774,522 ops/sec ±0.21% (98 runs sampled)
fast-deep-equal x 600,823 ops/sec ±1.01% (92 runs sampled)
underscore.isEqual x 255,012 ops/sec ±0.35% (97 runs sampled)
es-toolkit.isEqual x 217,138 ops/sec ±0.09% (94 runs sampled)
lodash.isEqual x 107,261 ops/sec ±0.24% (98 runs sampled)
deep-equal x 508 ops/sec ±2.77% (73 runs sampled)
```

## Benchmark for simple use case (mjs)

```diff
benchmark              avg (min … max) p75   p99    (min … top 1%)
-------------------------------------- -------------------------------
underscore                4.16 µs/iter   3.96 µs  █                   
                 (3.71 µs … 278.13 µs)   6.71 µs ▁█▅▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
lodash                   16.69 µs/iter  16.21 µs       █              
                  (11.00 µs … 1.19 ms)  28.46 µs ▁▁▁▁▁▂█▂▁▁▁▁▁▁▁▁▁▁▁▁▁
deep-eql                  9.76 µs/iter   9.67 µs    █▃                
                 (9.00 µs … 231.17 µs)  11.63 µs ▁▂▇███▆▃▂▁▁▁▁▁▁▁▁▁▁▁▁
es-toolkit                5.00 µs/iter   4.92 µs    █                 
                 (4.63 µs … 188.00 µs)   5.88 µs ▁▂▄██▇▂▂▁▁▁▁▁▂▁▁▁▁▁▁▁
dequal                    1.48 µs/iter   1.49 µs ▅▃██▃▂  ▂            
                   (1.47 µs … 1.54 µs)   1.52 µs ██████▇▄█▃▃▆▃▃▄▄▁▂▁▂▁
deep-equal                1.32 ms/iter   1.30 ms  █                   
                   (1.11 ms … 5.08 ms)   3.33 ms ▁█▃▄▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
fast-deep-equal           1.70 µs/iter   1.71 µs   ▃█ ▃▂              
                   (1.68 µs … 1.79 µs)   1.76 µs ▇▆██████▇█▂▂▃▆▂▆▁▁▁▂▁
tiny-is-equal           875.08 ns/iter 885.53 ns  █                   
               (860.76 ns … 932.81 ns) 911.42 ns ▅█▆▃▃▂▁▁▂▅▇▄▃▂▂▁▂▁▁▁▁

summary
+ tiny-is-equal
    1.7x faster than dequal
    1.95x faster than fast-deep-equal
    4.75x faster than underscore
    5.72x faster than es-toolkit
    11.16x faster than deep-eql
    19.07x faster than lodash
    1504.23x faster than deep-equal
```

## Benchmark for complex use case (cjs)

```diff
$ pnpm run benchmark:complex

+ tiny-is-equal x 139,032 ops/sec ±0.15% (97 runs sampled)
dequal x 164,526 ops/sec ±0.89% (98 runs sampled)
fast-deep-equal x 55,848 ops/sec ±4.45% (92 runs sampled)
underscore.isEqual x 85,663 ops/sec ±0.72% (95 runs sampled)
lodash.isEqual x 4,708 ops/sec ±3.68% (96 runs sampled)
es-toolkit.isEqual x 30,110 ops/sec ±0.29% (101 runs sampled)
deep-equal x 419 ops/sec ±1.72% (80 runs sampled)
```

## Benchmark for complex use case (mjs)

```diff
benchmark              avg (min … max) p75   p99    (min … top 1%)
-------------------------------------- -------------------------------
underscore               11.33 µs/iter  11.38 µs      █         █     
                 (11.23 µs … 11.43 µs)  11.42 µs █▁██▁█▁▁▁▁▁▁▁▁▁██▁▁▁▁
lodash                  214.78 µs/iter 212.25 µs  █                   
               (205.38 µs … 772.83 µs) 350.13 µs ▃█▂▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
deep-eql                216.54 µs/iter 213.50 µs █                    
               (209.46 µs … 617.92 µs) 331.58 µs █▇▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
es-toolkit               37.84 µs/iter  32.96 µs █                    
                  (32.04 µs … 5.21 ms) 103.00 µs █▁▁▁▁▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
dequal                    6.63 µs/iter   6.65 µs    █                 
                   (6.58 µs … 6.72 µs)   6.71 µs █▅▁█▁█▁█▁▁█▁██▁▁▁▁▅▁▁
deep-equal                1.75 ms/iter   1.76 ms    ▂█▃               
                   (1.60 ms … 2.38 ms)   2.22 ms ▁▂▂███▄▃▂▂▂▂▁▁▁▁▁▁▁▁▁
fast-deep-equal          19.50 µs/iter  17.37 µs █                    
                 (17.02 µs … 33.59 µs)  26.65 µs ██▁▁▄▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
tiny-is-equal             7.18 µs/iter   7.17 µs    █                 
                   (7.13 µs … 7.40 µs)   7.30 µs ▄▄▄█▆█▄▁▄▁▁▁▁▁▁▁▁▁▁▁▁

summary
  dequal
+   1.08x faster than tiny-is-equal
    1.71x faster than underscore
    2.94x faster than fast-deep-equal
    5.71x faster than es-toolkit
    32.4x faster than lodash
    32.66x faster than deep-eql
    264.66x faster than deep-equal
```

## Summary

- `tiny-is-equal` is the fastest library for simple use case.
- In complex use case, `tiny-is-equal` is 1.08x slower than `dequal`. But it's still faster than other libraries.
