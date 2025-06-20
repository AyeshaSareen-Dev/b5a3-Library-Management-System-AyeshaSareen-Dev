import { Router } from "express";
import { BookController } from "../controllers";

const BookRouter = Router();
const bookController = new BookController();

BookRouter.get("/", bookController.getAllBooks);
BookRouter.get("/:id", bookController.getBookById);
BookRouter.post("/", bookController.createBook);
BookRouter.put("/:id", bookController.updateBook);
BookRouter.delete("/:id", bookController.deleteBook);

export default BookRouter;
