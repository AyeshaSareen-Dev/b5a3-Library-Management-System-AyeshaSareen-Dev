import Express from "express";
import cors from "cors";
import errorHandler from "./middlewares/error-handler.middleware";
import { BookRouter, BorrowRouter } from "./routes";
import morgan from "morgan";

const app = Express();

// Middlewares
app.use(Express.json());
app.use(cors());
app.use(Express.urlencoded({ extended: true }));
app.use(morgan("common"));

// Routes
app.use("/api/books", BookRouter);
app.use("/api/borrow", BorrowRouter);

// Error handler
app.use(errorHandler);

export default app;
