# Benchmarks vs GraphQL

## Mac Studio

### 2024-05-24

Benchmark 1: bun bench:create grpc 10
  Time (mean ± σ):     278.8 ms ±  17.6 ms    [User: 329.2 ms, System: 51.8 ms]
  Range (min … max):   256.8 ms … 300.9 ms    10 runs

Benchmark 1: bun bench:create graphql 10
  Time (mean ± σ):     249.7 ms ±   4.3 ms    [User: 303.5 ms, System: 48.9 ms]
  Range (min … max):   243.4 ms … 257.3 ms    11 runs

Benchmark 1: bun bench:get-one grpc 10
  Time (mean ± σ):     274.8 ms ±  23.9 ms    [User: 299.1 ms, System: 47.2 ms]
  Range (min … max):   245.4 ms … 306.1 ms    10 runs

Benchmark 1: bun bench:get-one graphql 10
  Time (mean ± σ):     224.4 ms ±   2.6 ms    [User: 261.3 ms, System: 37.7 ms]
  Range (min … max):   221.1 ms … 228.9 ms    13 runs

Benchmark 1: bun bench:get-many grpc 10
  Time (mean ± σ):     226.7 ms ±   1.8 ms    [User: 274.8 ms, System: 38.3 ms]
  Range (min … max):   223.8 ms … 230.5 ms    13 runs

Benchmark 1: bun bench:get-many graphql 10
  Time (mean ± σ):     213.7 ms ±   1.5 ms    [User: 254.1 ms, System: 35.9 ms]
  Range (min … max):   211.4 ms … 216.3 ms    13 runs
