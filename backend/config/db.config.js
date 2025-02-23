const mysql = require('mysql2/promise');
require("dotenv").config();

if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASS || !process.env.DB_NAME) {
    console.error("❌ Missing required database environment variables.");
    process.exit(1);
}

const dbConfig = {
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
};

// Create the connection pool
const pool = mysql.createPool(dbConfig);

// Database connection check
(async () => {
    try {
        const connection = await pool.getConnection();
        console.log('✅ Connected to MySQL database');
        connection.release();
    } catch (err) {
        console.error('❌ Database connection failed:', err.message);
        process.exit(1);
    }
})();

async function query(sql, params = []) {
    try {
        const [rows] = await pool.execute(sql, params);
        return rows;
    } catch (err) {
        console.error("❌ Query Error:", err.message);
        throw err;
    }
}

async function getConnection() {
    try {
        return await pool.getConnection();
    } catch (err) {
        console.error("❌ Failed to get database connection:", err.message);
        throw err;
    }
}

module.exports = {
    query,
    getConnection,
    pool
};
