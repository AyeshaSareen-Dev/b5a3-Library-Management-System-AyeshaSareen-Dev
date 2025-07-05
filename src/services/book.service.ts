import { z } from "zod";
import { BookFilterShape, BookModel, BookShape } from "../schema/book";
import { UpdateBookValidator } from "../schema/book/book.validator";
import {
  InternalServerException,
  NotFoundException,
} from "../utils/HttpException";
import { ResponseBuilder } from "../utils/ResponseBuilder";

export class BookService {
  constructor() {}

  async createBook(book: BookShape) {
    try {
      const newBook = new BookModel(book);
      const savedBook = await newBook.save();

      return ResponseBuilder.success(201)
        .withData(savedBook)
        .withMessage("Book created successfully")
        .build();
    } catch (err) {
      console.log("[BookService] Failed to create a book", err);
      throw new InternalServerException("Failed to create a book");
    }
  }

  async getBooks(filters: BookFilterShape) {
    try {
      var query = BookModel.find();
      var countQuery = BookModel.countDocuments();
      if (filters.filter) {
        query = query.where("genre").equals(filters.filter);
        countQuery = countQuery.where("genre").equals(filters.filter);
      }
      query = query
        .limit(filters.limit)
        .skip((filters.page - 1) * filters.limit)
        .sort({ [filters.sortBy]: filters.sort === "desc" ? -1 : 1 });

      const [data, total] = await Promise.all([query.exec(), countQuery.exec()]);

      return ResponseBuilder.success()
        .withData(data)
        .withMetadata({
          total,
          pageCount: Math.ceil(total / filters.limit),
        })
        .withMessage("Books retrieved successfully")
        .build();
    } catch (err) {
      console.log("[BookService] Failed to get books", err);
      throw new InternalServerException("Failed to get books");
    }
  }

  async getBookById(id: string) {
    try {
      const book = await BookModel.findById(id);

      if (!book) throw new NotFoundException("Book not found!");

      return ResponseBuilder.success()
        .withData(book)
        .withMessage("Book retrieved successfully")
        .build();
    } catch (err) {
      if (err instanceof NotFoundException) throw err;

      console.log("[BookService] Failed to get a book", err);
      throw new InternalServerException("Failed to get a book");
    }
  }

  async updateBook(id: string, data: z.infer<typeof UpdateBookValidator>) {
    try {
      const book = await BookModel.updateOne({ _id: id }, { $set: data });

      if (!book) throw new NotFoundException("Book not found!");

      return ResponseBuilder.success()
        .withData(book)
        .withMessage("Book updated successfully")
        .build();
    } catch (err) {
      if (err instanceof NotFoundException) throw err;

      console.log("[BookService] Failed to update a book", err);
      throw new InternalServerException("Failed to update a book");
    }
  }

  async deleteBook(id: string) {
    try {
      const book = await BookModel.findByIdAndDelete(id);

      if (!book) throw new NotFoundException("Book not found!");

      return ResponseBuilder.success()
        .withData(null)
        .withMessage("Book deleted successfully")
        .build();
    } catch (err) {
      console.log("[BookService] Failed to delete a book", err);
      throw new InternalServerException("Failed to delete a book");
    }
  }
}
