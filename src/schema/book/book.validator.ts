import { z } from "zod";

export const BookValidator = z.object({
  title: z.string({ message: "A book title is required." }),
  author: z.string({ message: "Author's name is required." }),
  genre: z.enum([
    "FICTION",
    "NON_FICTION",
    "SCIENCE",
    "HISTORY",
    "BIOGRAPHY",
    "FANTASY",
  ]),
  isbn: z.string({ message: "ISBN is required." }),
  description: z.string().optional(),
  copies: z
    .number({ message: "Number of copies is required." })
    .nonnegative("Number of copies must be a non-negative integer."),
  available: z.boolean().optional().default(true),
});

export const UpdateBookValidator = BookValidator.partial();
