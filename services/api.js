const bigqueryClient = require('./bigquery-client.js');
const config = require('../config.js');
const utils = require('./utils.js');

async function getTrends(minutes) {
    let tableName = config.gcp_infra.bq.dataSetId + '.' + config.gcp_infra.bq.table.tweets;
    // Optimization: Generate SQL once and reuse it to avoid redundant function calls and string concatenation
    const sqlQuery = utils.getTrends(tableName, minutes);
    console.log('getTrends SQL ', sqlQuery);
    const options = {
        query: sqlQuery,
        location: 'US',
    };

    // Optimization: Return the promise directly, avoiding explicit Promise constructor anti-pattern
    return bigqueryClient.query(options);
}

module.exports = { getTrends };
