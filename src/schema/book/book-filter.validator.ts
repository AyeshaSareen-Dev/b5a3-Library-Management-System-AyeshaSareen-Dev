import { z } from "zod";

export const BookFilterValidator = z.object({
  sort: z.enum(["asc", "desc"]).optional().default("desc"),
  sortBy: z
    .enum(["title", "author", "genre", "isbn", "createdAt", "updatedAt"])
    .optional()
    .default("createdAt"),
  limit: z.coerce.number().min(1).max(100).optional().default(10),
  page: z.coerce.number().min(1).optional().default(1),
  filter: z
    .enum([
      "FICTION",
      "NON_FICTION",
      "SCIENCE",
      "HISTORY",
      "BIOGRAPHY",
      "FANTASY",
    ])
    .optional(),
});
