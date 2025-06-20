import { Router } from "express";
import { BorrowController } from "../controllers";

const borrowController = new BorrowController();
const BorrowRouter = Router();

BorrowRouter.get("/", borrowController.getBorrowedBookSummary);
BorrowRouter.post("/", borrowController.borrowBook);

export default BorrowRouter;
