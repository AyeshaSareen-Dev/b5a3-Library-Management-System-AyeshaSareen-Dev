import { isValidObjectId } from "mongoose";
import { z } from "zod";

export const BorrowValidator = z.object({
  book: z.string().refine((id) => isValidObjectId(id), {
    message: "Invalid ID",
  }),
  quantity: z.coerce.number().positive("Quantity must be a positive integer."),
  dueDate: z.string().datetime(),
});
