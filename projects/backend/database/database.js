const { Pool } = require('pg');

const pool = new Pool({
    host: "db", // Use the service name from Docker Compose
    user: "postgres",
    password: "thisisKamelika13",
    database: "postgres",
    port: 5432, // PostgreSQL default port
});

module.exports = pool;