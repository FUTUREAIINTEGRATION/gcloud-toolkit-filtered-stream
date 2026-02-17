const { performance } = require('perf_hooks');

// Mock BigQuery to simulate instantiation cost
class MockBigQuery {
    constructor() {
        // Simulate some initialization work
        this.config = {};
        for(let i=0; i<1000; i++) {
            this.config[i] = i;
        }
    }
    query() { return Promise.resolve([]); }
}

const ITERATIONS = 10000;

// Approach 1: Instantiate every time
function withInstantiation() {
  const bq = new MockBigQuery();
  return bq;
}

// Approach 2: Reuse
const bqInstance = new MockBigQuery();
function withoutInstantiation() {
  return bqInstance;
}

// Measure 1
const start1 = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
  withInstantiation();
}
const end1 = performance.now();
const time1 = end1 - start1;

// Measure 2
const start2 = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
  withoutInstantiation();
}
const end2 = performance.now();
const time2 = end2 - start2;

console.log(`Iterations: ${ITERATIONS}`);
console.log(`With Instantiation: ${time1.toFixed(2)}ms`);
console.log(`With Reuse:         ${time2.toFixed(2)}ms`);
console.log(`Improvement: ${(time1 / time2).toFixed(2)}x faster`);
