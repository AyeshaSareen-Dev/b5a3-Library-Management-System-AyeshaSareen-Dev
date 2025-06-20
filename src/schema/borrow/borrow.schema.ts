import { Schema } from "mongoose";
import { z } from "zod";
import { BorrowValidator } from "./borrow.validator";
import { BookModel } from "../book";
import { NotFoundException } from "../../utils/HttpException";
import { UnprocessableEntityException } from "../../utils/HttpException/UnprocessableEntityException";

export type BorrowShape = z.infer<typeof BorrowValidator>;

export const BorrowSchema = new Schema(
  {
    book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    quantity: { type: Number, required: true },
    dueDate: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

BorrowSchema.pre("save", async function (next) {
  try {
    const book = await BookModel.findById(this.book);

    if (!book) return next(new NotFoundException("Book not found!"));

    if (!book.available || book.copies < this.quantity)
      return next(
        new UnprocessableEntityException("Not enough copies available!")
      );

    next();
  } catch (err) {
    next(err as any);
  }
});

BorrowSchema.post("save", async function (doc, next) {
  try {
    const book = await BookModel.findById(doc.book);
    if (!book) return next(new NotFoundException("Book not found!"));
    await BookModel.borrow({
      id: book._id.toString(),
      copies: book.copies - doc.quantity,
      available: book.copies > doc.quantity,
    });

    next();
  } catch (err) {
    next(err as any);
  }
});
