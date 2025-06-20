# 📚 Library Management System API

A robust **Library Management System** built with **Express**, **TypeScript**, and **MongoDB (via Mongoose)**. This API allows users to manage books, borrow records, and retrieve borrowing summaries, with strict adherence to the provided requirements, including schema validation, business logic enforcement, Mongoose middleware, and aggregation pipelines.

## 🎯 Objective

This project implements a Library Management System as per the requirements of Assignment 3, featuring:
- **Schema Validation**: Enforced using Mongoose schemas and Zod for request validation.
- **Business Logic**: Ensures books have sufficient copies before borrowing and updates availability.
- **Aggregation Pipeline**: Summarizes borrowed books with total quantities.
- **Mongoose Middleware**: Validates and updates book availability during borrow operations.
- **Filtering Features**: Supports genre-based filtering and sorting for book retrieval.

## 📦 Features

- **Book Management**:
  - Create, retrieve, update, and delete books.
  - Filter books by genre and sort by creation date.
- **Borrow Management**:
  - Borrow books with validation for available copies.
  - Automatically update book copies and availability using Mongoose middleware.
- **Borrow Summary**:
  - Retrieve a summary of borrowed books using MongoDB aggregation.
- **Error Handling**:
  - Custom error responses for validation failures, not found, and unprocessable entities.
- **Type Safety**:
  - Built with TypeScript for type-safe code and better developer experience.
- **Code Quality**:
  - Clean, modular code with ESLint and Prettier for linting and formatting.

## 🔗 Links

- **GitHub Repository**: [https://github.com/AyeshaSareen-Dev/b5a3-Library-Management-System-AyeshaSareen-Dev](https://github.com/AyeshaSareen-Dev/b5a3-Library-Management-System-AyeshaSareen-Dev)
- **Live Deployment**: [https://b5a3-library-management-system-ayes.vercel.app/](https://b5a3-library-management-system-ayes.vercel.app/)
- **Video Explanation**: [Link to be added upon submission]

## 🛠️ Setup Instructions

### Prerequisites

- **Node.js**: v18 or higher
- **MongoDB**: A running MongoDB instance (local or cloud, e.g., MongoDB Atlas)
- **Git**: For cloning the repository
- **Vercel CLI** (optional): For deployment

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/AyeshaSareen-Dev/b5a3-Library-Management-System-AyeshaSareen-Dev.git
   cd b5a3-Library-Management-System-AyeshaSareen-Dev
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the project root and add the following:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/library
   ```
   Replace `MONGODB_URI` with your MongoDB connection string (e.g., MongoDB Atlas URI).

4. **Build the Project**:
   ```bash
   npm run build
   ```

5. **Run the Application**:
   - For production:
     ```bash
     npm start
     ```
   - For development (with hot-reloading):
     ```bash
     npm run dev
     ```

6. **Access the API**:
   The API will be available at `http://localhost:3000` (or the port specified in `.env`).

### Deployment

To deploy on Vercel:
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project root and follow the prompts.
3. Ensure `MONGODB_URI` is set in Vercel’s environment variables.

## 📋 API Endpoints

All endpoints follow the exact response formats specified in the requirements.

### 1. Create Book
- **Endpoint**: `POST /api/books`
- **Description**: Create a new book with validated fields.
- **Request Body**:
  ```json
  {
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 5,
    "available": true
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Book created successfully",
    "data": { /* Book object */ }
  }
  ```

### 2. Get All Books
- **Endpoint**: `GET /api/books`
- **Description**: Retrieve books with optional filtering and sorting.
- **Query Parameters**:
  - `filter`: Genre (e.g., `FICTION`, `SCIENCE`)
  - `sortBy`: Field to sort by (e.g., `createdAt`)
  - `sort`: `asc` or `desc`
  - `limit`: Number of results (default: 10)
- **Example**: `/api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5`
- **Response**:
  ```json
  {
    "success": true,
    "message": "Books retrieved successfully",
    "data": [ /* Array of book objects */ ]
  }
  ```

### 3. Get Book by ID
- **Endpoint**: `GET /api/books/:bookId`
- **Description**: Retrieve a book by its ID.
- **Response**:
  ```json
  {
    "success": true,
    "message": "Book retrieved successfully",
    "data": { /* Book object */ }
  }
  ```

### 4. Update Book
- **Endpoint**: `PUT /api/books/:bookId`
- **Description**: Update a book’s details (e.g., copies).
- **Request Body**:
  ```json
  {
    "copies": 50
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Book updated successfully",
    "data": { /* Updated book object */ }
  }
  ```

### 5. Delete Book
- **Endpoint**: `DELETE /api/books/:bookId`
- **Description**: Delete a book by its ID.
- **Response**:
  ```json
  {
    "success": true,
    "message": "Book deleted successfully",
    "data": null
  }
  ```

### 6. Borrow a Book
- **Endpoint**: `POST /api/borrow`
- **Description**: Borrow a book, updating its copies and availability.
- **Request Body**:
  ```json
  {
    "book": "64ab3f9e2a4b5c6d7e8f9012",
    "quantity": 2,
    "dueDate": "2025-07-18T00:00:00.000Z"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Book borrowed successfully",
    "data": { /* Borrow object */ }
  }
  ```

### 7. Borrowed Books Summary
- **Endpoint**: `GET /api/borrow`
- **Description**: Retrieve a summary of borrowed books using aggregation.
- **Response**:
  ```json
  {
    "success": true,
    "message": "Borrowed books summary retrieved successfully",
    "data": [
      {
        "book": {
          "title": "The Theory of Everything",
          "isbn": "9780553380163"
        },
        "totalQuantity": 5
      },
      /* ... */
    ]
  }
  ```

## 📁 Project Structure

```
.
├── README.md
├── api
│   └── index.ts
├── package-lock.json
├── package.json
├── public
│   └── favicon.ico
├── src
│   ├── app.ts
│   ├── config
│   │   └── Environment.ts
│   ├── controllers
│   │   ├── book.controller.ts
│   │   ├── borrow.controller.ts
│   │   └── index.ts
│   ├── docs
│   ├── middlewares
│   │   └── error-handler.middleware.ts
│   ├── routes
│   │   ├── book.routes.ts
│   │   ├── borrow.routes.ts
│   │   └── index.ts
│   ├── schema
│   │   ├── book
│   │   │   ├── book-filter.schema.ts
│   │   │   ├── book-filter.validator.ts
│   │   │   ├── book.model.ts
│   │   │   ├── book.schema.ts
│   │   │   ├── book.validator.ts
│   │   │   └── index.ts
│   │   └── borrow
│   │       ├── book-borrow.aggregate.pipe.ts
│   │       ├── borrow.model.ts
│   │       ├── borrow.schema.ts
│   │       ├── borrow.validator.ts
│   │       └── index.ts
│   ├── services
│   │   ├── book.service.ts
│   │   ├── borrow.service.ts
│   │   └── index.ts
│   └── utils
│       ├── HttpException
│       │   ├── BadRequestException.ts
│       │   ├── HttpException.ts
│       │   ├── InternalServerException.ts
│       │   ├── NotFoundException.ts
│       │   ├── UnprocessableEntityException.ts
│       │   └── index.ts
│       └── ResponseBuilder.ts
├── tsconfig.json
└── vercel.json
```

### Key Components

- **Controllers**: Handle request/response logic for books and borrows.
- **Services**: Contain business logic and database operations.
- **Schemas**: Define Mongoose models and Zod validation schemas.
- **Middlewares**: Custom error handling for consistent responses.
- **Utils**: Reusable utilities for HTTP exceptions and response formatting.
- **Config**: Environment variable management.

## 📦 Dependencies

### Production Dependencies
- `cors`: ^2.8.5 - Enable CORS for API access.
- `dotenv`: ^16.5.0 - Load environment variables from `.env`.
- `express`: ^5.1.0 - Web framework for building the API.
- `mongoose`: ^8.16.0 - MongoDB ODM for schema and model management.
- `morgan`: ^1.10.0 - HTTP request logging.
- `zod`: ^3.25.67 - Schema validation for request payloads.

### Development Dependencies
- `@types/cors`: ^2.8.19 - TypeScript types for CORS.
- `@types/express`: ^5.0.3 - TypeScript types for Express.
- `@types/morgan`: ^1.9.10 - TypeScript types for Morgan.
- `@types/node`: ^24.0.3 - TypeScript types for Node.js.
- `eslint`: ^9.29.0 - Linting for code quality.
- `nodemon`: ^3.1.10 - Auto-restart server during development.
- `prettier`: ^3.5.3 - Code formatting.
- `ts-node`: ^10.9.2 - Run TypeScript directly.
- `typescript`: ^5.8.3 - TypeScript compiler.

## 🛡️ Error Handling

The API uses custom HTTP exceptions (`NotFoundException`, `BadRequestException`, `UnprocessableEntityException`, `InternalServerException`) to handle errors gracefully. All error responses follow the specified format:
```json
{
  "message": "Validation failed",
  "success": false,
  "error": { /* Error details */ }
}
```

## 🧠 Implementation Highlights

- **Mongoose Middleware**:
  - `pre('save')` on `BorrowSchema` validates book availability and copies.
  - `post('save')` updates book copies and availability using a custom static method.
- **Static Method**: `BookModel.borrow` updates book copies and availability atomically.
- **Aggregation Pipeline**: Summarizes borrowed books with total quantities, joining with book details.
- **Zod Validation**: Ensures request payloads conform to schema requirements.
- **TypeScript**: Provides type safety across models, controllers, and services.
- **ResponseBuilder**: Utility for consistent API response formatting.

## 📝 Notes

- The project strictly adheres to the provided API endpoints and response formats.
- MongoDB transactions are not used due to the assumption of a standalone MongoDB instance, but optimistic locking could be added for concurrency.
- The codebase is modular, with separate concerns for controllers, services, and schemas.
- The live deployment on Vercel ensures accessibility for testing.

## 📬 Contact

For questions or feedback, contact [Ayesha Sareen] via [email@example.com] or open an issue on the GitHub repository.

## 📜 License

This project is licensed under the ISC License.

---

**Submission Details**:
- **Deadline**: June 21, 2025, 11:59 PM (60 Marks)
- **Author**: Ayesha Sareen
- **Assignment**: B5A3 - Library Management System