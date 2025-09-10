# Todo Backend API

A complete and well-structured backend API for a To-Do list application built with Node.js, Express.js, and SQLite.

## Features

- ✅ Complete CRUD operations for tasks
- ✅ SQLite database with automatic initialization
- ✅ Input validation and sanitization
- ✅ Centralized error handling
- ✅ Due-soon tasks endpoint
- ✅ RESTful API design
- ✅ Environment-based configuration
- ✅ Professional code organization

## Technology Stack

- **Framework**: Node.js with Express.js
- **Database**: SQLite with sqlite3
- **Validation**: express-validator
- **Configuration**: dotenv
- **CORS**: cors middleware

## Installation

1. Clone the repository or download the project files
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on the provided `.env` example
4. Start the server:
   ```bash
   npm start
   ```
   
   For development with auto-reload:
   ```bash
   npm run dev
   ```

## API Endpoints

### Base URL
```
http://localhost:3000
```

### Health Check
- **GET** `/` - API status and endpoint documentation

### Task Management

#### Create Task
- **POST** `/tasks`
- **Body** (JSON):
  ```json
  {
    "title": "Complete project documentation", // Required
    "description": "Write comprehensive README and API docs", // Optional
    "due_date": "2025-12-31T10:00:00Z" // Optional, ISO 8601 format
  }
  ```

#### Get All Tasks
- **GET** `/tasks`
- Returns array of all tasks

#### Get Task by ID
- **GET** `/tasks/:id`
- Returns single task or 404 if not found

#### Update Task
- **PUT** `/tasks/:id`
- **Body** (JSON) - All fields optional:
  ```json
  {
    "title": "Updated task title",
    "description": "Updated description",
    "due_date": "2025-12-31T15:00:00Z",
    "completed": 1
  }
  ```

#### Delete Task
- **DELETE** `/tasks/:id`
- Returns success message or 404 if not found

#### Get Tasks Due Soon
- **GET** `/tasks/due-soon`
- Returns uncompleted tasks due within the next 7 days

## Database Schema

### Tasks Table
```sql
CREATE TABLE tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  due_date TEXT,
  completed INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

## Response Format

All API responses follow this consistent format:

### Success Response
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": { /* result data */ },
  "count": 5 // Only for array responses
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "details": [ /* validation errors if applicable */ ]
}
```

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
DB_NAME=todo.db
NODE_ENV=development
```

## Project Structure

```
todo-backend-api/
├── controllers/
│   └── taskController.js      # Business logic for tasks
├── middleware/
│   └── errorHandler.js        # Error handling middleware
├── routes/
│   └── taskRoutes.js          # API route definitions
├── .env                       # Environment variables
├── database.js                # Database connection and setup
├── package.json               # Dependencies and scripts
├── server.js                  # Main application entry point
└── README.md                  # Documentation
```

## Error Handling

The API includes comprehensive error handling:

- **400**: Bad Request (validation errors, malformed data)
- **404**: Not Found (task doesn't exist)
- **500**: Internal Server Error (database or server issues)

All errors return consistent JSON responses with helpful error messages.

## Validation Rules

### Task Creation
- `title`: Required, 1-255 characters
- `description`: Optional, max 1000 characters
- `due_date`: Optional, must be valid ISO 8601 format

### Task Updates
- All fields are optional
- Same validation rules as creation when fields are provided
- `completed`: Must be 0, 1, true, or false

## Development

The project uses nodemon for development with auto-reload:

```bash
npm run dev
```

This will automatically restart the server when you make changes to the code.

## Testing the API

You can test the API using tools like:
- Postman
- Insomnia
- curl commands
- Thunder Client (VS Code extension)

### Example curl commands:

```bash
# Create a task
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Test task","description":"This is a test task"}'

# Get all tasks
curl http://localhost:3000/tasks

# Get task by ID
curl http://localhost:3000/tasks/1

# Update a task
curl -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"completed":1}'

# Delete a task
curl -X DELETE http://localhost:3000/tasks/1

# Get tasks due soon
curl http://localhost:3000/tasks/due-soon
```

## Contributing

1. Follow the existing code structure and patterns
2. Add appropriate validation for new endpoints
3. Include error handling for all database operations
4. Update this README if you add new features

## License

ISC