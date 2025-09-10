const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Database file path
const DB_PATH = path.join(__dirname, process.env.DB_NAME || 'todo.db');

// Create database connection
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('❌ Error opening database:', err.message);
  } else {
    console.log('✅ Connected to SQLite database successfully');
  }
});

/**
 * Initialize database and create tables if they don't exist
 */
const initializeDatabase = () => {
  return new Promise((resolve, reject) => {
    const createTasksTable = `
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        due_date TEXT,
        completed INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `;

    db.run(createTasksTable, (err) => {
      if (err) {
        console.error('❌ Error creating tasks table:', err.message);
        reject(err);
      } else {
        console.log('✅ Tasks table initialized successfully');
        resolve();
      }
    });
  });
};

/**
 * Run a SQL query with parameters
 * @param {string} sql - SQL query string
 * @param {Array} params - Parameters for the query
 * @returns {Promise} Promise that resolves with query result
 */
const runQuery = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) {
        reject(err);
      } else {
        resolve({ 
          id: this.lastID, 
          changes: this.changes 
        });
      }
    });
  });
};

/**
 * Get single row from database
 * @param {string} sql - SQL query string
 * @param {Array} params - Parameters for the query
 * @returns {Promise} Promise that resolves with single row
 */
const getRow = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

/**
 * Get multiple rows from database
 * @param {string} sql - SQL query string
 * @param {Array} params - Parameters for the query
 * @returns {Promise} Promise that resolves with array of rows
 */
const getAllRows = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

module.exports = {
  db,
  initializeDatabase,
  runQuery,
  getRow,
  getAllRows
};