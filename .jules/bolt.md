# Bolt's Journal

## 2024-05-22 - [Project Start]
**Learning:** Initialized Bolt's journal for the Twitter API Toolkit project.
**Action:** Will document critical performance learnings here.

## 2024-05-22 - [Double Serialization & Stream Crashes]
**Learning:** Found a critical performance + correctness anti-pattern where a JSON string was being re-stringified (`JSON.stringify(string)`) before publishing, causing double-encoding overhead and consumer complexity. Also discovered `String.append` usage which crashes Node.js, and variable scoping issues in stream handlers that prevented split-packet reassembly.
**Action:** Always verify stream buffering logic works across chunks. Check for redundant serialization steps when passing data between internal services.
