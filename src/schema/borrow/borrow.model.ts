import { model } from "mongoose";
import { BorrowSchema } from "./borrow.schema";

export const BorrowModel = model("Borrow", BorrowSchema);
