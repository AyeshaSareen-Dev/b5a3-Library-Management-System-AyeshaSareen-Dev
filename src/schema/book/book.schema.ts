import { z } from "zod";
import { BookValidator } from "./book.validator";
import { Schema } from "mongoose";

export type BookShape = z.infer<typeof BookValidator>;

export const BookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: {
      type: String,
      enum: [
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
      ],
      required: true,
    },
    isbn: { type: String, required: true },
    description: String,
    copies: { type: Number, required: true, min: 0 },
    available: Boolean,
  },
  {
    timestamps: true,
    methods: {},
    statics: {
      updateCopies({ id, copies }: { id: string; copies: number }) {
        return this.findByIdAndUpdate(
          id,
          { copies, available: true },
          { new: true }
        );
      },
      borrow({
        id,
        copies,
        available,
      }: {
        id: string;
        copies: number;
        available: boolean;
      }) {
        return this.findByIdAndUpdate(
          id,
          {
            copies,
            available,
          },
          { new: true }
        );
      },
    },
  }
);
