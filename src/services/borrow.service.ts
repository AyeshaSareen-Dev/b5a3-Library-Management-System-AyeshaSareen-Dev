import { BookModel } from "../schema/book";
import { BookBorrowPipe, BorrowModel, BorrowShape } from "../schema/borrow";
import {
  InternalServerException,
  NotFoundException,
} from "../utils/HttpException";
import { UnprocessableEntityException } from "../utils/HttpException/UnprocessableEntityException";
import { ResponseBuilder } from "../utils/ResponseBuilder";

export class BorrowService {
  constructor() {}

  async getBorrowedBookSummary() {
    try {
      const data = await BookBorrowPipe.exec();
      return ResponseBuilder.success()
        .withData(data)
        .withMessage("Borrowed books summary retrieved successfully")
        .build();
    } catch (err) {
      console.log("[BorrowService] Failed to get borrowed book summary", err);
      throw new InternalServerException("Failed to get borrowed book summary.");
    }
  }

  async borrowBook(data: BorrowShape) {
    try {
      const borrow = await BorrowModel.create(data);

      return ResponseBuilder.success(201)
        .withData(borrow)
        .withMessage("Book borrowed successfully")
        .build();
    } catch (err) {
      if (
        err instanceof NotFoundException ||
        err instanceof UnprocessableEntityException
      )
        throw err;
      console.log("[BorrowService] Failed to borrow a book", err);
      throw new InternalServerException("Failed to borrow a book");
    }
  }
}
