import { z } from "zod";
import { BookFilterValidator } from "./book-filter.validator";

export type BookFilterShape = z.infer<typeof BookFilterValidator>;
