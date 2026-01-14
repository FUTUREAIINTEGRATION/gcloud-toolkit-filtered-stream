# Bolt's Journal

## 2024-05-22 - [Project Start]
**Learning:** Initialized Bolt's journal for the Twitter API Toolkit project.
**Action:** Will document critical performance learnings here.

## 2024-05-22 - [Double Serialization & Stream Crashes]
**Learning:** Found a critical performance + correctness anti-pattern where a JSON string was being re-stringified (`JSON.stringify(string)`) before publishing, causing double-encoding overhead and consumer complexity. Also discovered `String.append` usage which crashes Node.js, and variable scoping issues in stream handlers that prevented split-packet reassembly.
**Action:** Always verify stream buffering logic works across chunks. Check for redundant serialization steps when passing data between internal services.

## 2024-05-22 - [API Correctness: Needle Options & Response Handling]
**Learning:**
1. `needle.get(url, options)` does not accept a third argument. Passing `{timeout}` as a third argument means the timeout is ignored. Options must be merged into the second argument.
2. In Express controllers, always ensure only one response is sent. Checking for errors but continuing execution (`if (err) res.json(err); res.json(data)`) leads to "Can't set headers after they are sent" crashes.
**Action:** double-check library signatures (like `needle`) and use `else` blocks or `return` when sending error responses.
