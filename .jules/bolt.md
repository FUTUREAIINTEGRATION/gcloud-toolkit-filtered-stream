## 2024-05-23 - BigQuery Client Instantiation Overhead
**Learning:** Instantiating `new BigQuery()` repeatedly in a hot path (like stream processing) introduces measurable overhead (~0.03ms per call in dry run, likely more with actual auth checks) and creates unnecessary object churn.
**Action:** Always instantiate heavy cloud clients (BigQuery, PubSub, etc.) as singletons or at the module level and reuse them.

## 2024-05-23 - Promise Constructor Anti-pattern
**Learning:** Wrapping a promise-returning function (like `bigquery.table.insert`) in `new Promise((resolve, reject) => ...)` adds complexity and a micro-task overhead without any benefit.
**Action:** Return the promise chain directly or use `async/await`.
