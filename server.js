const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { initializeDatabase } = require('./database');
const taskRoutes = require('./routes/taskRoutes');
const errorHandler = require('./middleware/errorHandler');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
// This line below was removed as it's redundant with express.json() in modern Express
// app.use(express.urlencoded({ extended: true }));

// Async function to start the server
const startServer = async () => {
  try {
    // Wait for the database to be initialized before starting the server
    await initializeDatabase();

    // Routes
    app.use('/tasks', taskRoutes);

    // Health check endpoint
    app.get('/', (req, res) => {
      res.json({
        message: 'Todo API is running successfully!',
        version: '1.0.0',
        endpoints: {
          'GET /tasks': 'Get all tasks',
          'GET /tasks/:id': 'Get task by ID',
          'POST /tasks': 'Create new task',
          'PUT /tasks/:id': 'Update task',
          'DELETE /tasks/:id': 'Delete task',
          'GET /tasks/due-soon': 'Get tasks due within 7 days'
        }
      });
    });

    // Error handling middleware (must be the last middleware)
    app.use(errorHandler);

    // Handle 404 for any routes not found
    app.use('*', (req, res) => {
      res.status(404).json({ success: false, error: 'Route not found' });
    });

    app.listen(PORT, () => {
      console.log(`🚀 Todo API Server running on port ${PORT}`);
      console.log(`📖 API Documentation: http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1); // Exit the process with an error code
  }
};

// Start the application
startServer();

module.exports = app;

