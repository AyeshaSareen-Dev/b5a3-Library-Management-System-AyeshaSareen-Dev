import { model } from "mongoose";
import { BookSchema } from "./book.schema";

export const BookModel = model("Book", BookSchema);
