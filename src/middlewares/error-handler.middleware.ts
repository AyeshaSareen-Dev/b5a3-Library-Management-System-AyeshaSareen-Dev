import { NextFunction, Request, Response } from "express";
import { ResponseBuilder } from "../utils/ResponseBuilder";

export default function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = ResponseBuilder.error().withError(err).build();
  res.status(result.statusCode ?? 500).json(result);
}
