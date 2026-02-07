const { BigQuery } = require("@google-cloud/bigquery");

// Optimization: Instantiate BigQuery client once and reuse it across the application.
// This prevents repeated initialization overhead and allows connection pooling.
const bigqueryClient = new BigQuery();

module.exports = bigqueryClient;
