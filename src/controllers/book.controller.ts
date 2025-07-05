import { NextFunction, Request, Response } from "express";
import { BookFilterValidator, BookValidator } from "../schema/book";
import { BookService } from "../services";
import { z } from "zod";
import { isValidObjectId } from "mongoose";
import { ResponseBuilder } from "../utils/ResponseBuilder";
import { UpdateBookValidator } from "../schema/book/book.validator";

export class BookController {
  private bookService: BookService;
  constructor() {
    this.bookService = new BookService();
  }

  getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const filters = BookFilterValidator.parse(req.query);
      const books = await this.bookService.getBooks(filters);

      res.status(books.statusCode).json(ResponseBuilder.format(books));
    } catch (err) {
      console.error("[BookController] Failed to get books", err);
      next(err);
    }
  };

  getBookById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = z
        .object({
          id: z.string().refine((id) => isValidObjectId(id), {
            message: "Invalid ID",
          }),
        })
        .parse(req.params);
      const book = await this.bookService.getBookById(id);
      res.status(book.statusCode).json(ResponseBuilder.format(book));
    } catch (err) {
      console.error("[BookController] Failed to get a book", err);
      next(err);
    }
  };

  createBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("Request Body", req.body);
      const bookInput = BookValidator.parse(req.body);

      const book = await this.bookService.createBook({
        ...bookInput,
        available: bookInput.copies > 0,
      });
      res.status(book.statusCode).json(ResponseBuilder.format(book));
    } catch (err) {
      console.error("[BookController] Failed to create a book", err);
      next(err);
    }
  };

  updateBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = z
        .object({
          id: z.string().refine((id) => isValidObjectId(id), {
            message: "Invalid ID",
          }),
        })
        .parse(req.params);

      const data = UpdateBookValidator.parse(req.body);

      const book = await this.bookService.updateBook(id, {
        ...data,
        available: data.copies ? data.copies > 0 : data.available,
      });
      res.status(book.statusCode).json(ResponseBuilder.format(book));
    } catch (err) {
      console.error("[BookController] Failed to update a book", err);
      next(err);
    }
  };

  deleteBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = z
        .object({
          id: z.string().refine((id) => isValidObjectId(id), {
            message: "Invalid ID",
          }),
        })
        .parse(req.params);

      const book = await this.bookService.deleteBook(id);
      res.status(book.statusCode).json(ResponseBuilder.format(book));
    } catch (err) {
      console.error("[BookController] Failed to delete a book", err);
      next(err);
    }
  };
}
