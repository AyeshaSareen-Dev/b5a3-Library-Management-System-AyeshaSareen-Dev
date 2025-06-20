import { NextFunction, Request, Response } from "express";
import { BorrowService } from "../services";
import { BorrowValidator } from "../schema/borrow";
import { ResponseBuilder } from "../utils/ResponseBuilder";

export class BorrowController {
  private borrowService: BorrowService;

  constructor() {
    this.borrowService = new BorrowService();
  }

  getBorrowedBookSummary = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.borrowService.getBorrowedBookSummary();
      res.status(data.statusCode).json(ResponseBuilder.format(data));
    } catch (err) {
      console.error(
        "[BorrowController] Failed to get borrowed book summary",
        err
      );
      next(err);
    }
  };

  borrowBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const borrowData = BorrowValidator.parse(req.body);
      const data = await this.borrowService.borrowBook(borrowData);
      res.status(data.statusCode).json(ResponseBuilder.format(data));
    } catch (err) {
      console.error("[BorrowController] Failed to borrow a book", err);
      next(err);
    }
  };
}
