const Module = require('module');
const originalRequire = Module.prototype.require;

let queryCalledWith = null;
let queryCallCount = 0;

const mockBigQueryClient = {
    query: async (options) => {
        queryCallCount++;
        queryCalledWith = options;
        return [];
    }
};

Module.prototype.require = function(request) {
    if (request.endsWith('bigquery-client.js')) {
        return mockBigQueryClient;
    }
    return originalRequire.apply(this, arguments);
};

const api = require('../services/api.js');

async function runTest() {
    console.log('Testing getTrends...');
    const minutes = 60;

    // We expect utils.getTrends to be called, but we are testing api.js logic here.
    // We check if the query passed to BigQuery is what we expect (valid SQL string).

    await api.getTrends(minutes);

    if (queryCallCount === 1) {
        console.log('PASS: BigQuery.query called exactly once.');
    } else {
        console.error(`FAIL: BigQuery.query called ${queryCallCount} times.`);
        process.exit(1);
    }

    if (queryCalledWith && queryCalledWith.query && queryCalledWith.query.includes('INTERVAL ' + minutes + ' MINUTE')) {
        console.log('PASS: SQL query contains correct interval.');
    } else {
        console.error('FAIL: SQL query incorrect.');
        console.log('Received:', queryCalledWith);
        process.exit(1);
    }
}

runTest().catch(err => {
    console.error(err);
    process.exit(1);
});
