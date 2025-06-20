import { BookModel } from "../book";
import { BorrowModel } from "./borrow.model";

export const BookBorrowPipe = BorrowModel.aggregate([
  {
    $group: {
      _id: "$book",
      totalQuantity: { $sum: "$quantity" },
    },
  },
  {
    $project: {
      _id: 0,
      book: "$_id",
      totalQuantity: 1,
    },
  },
  {
    $lookup: {
      from: BookModel.collection.name,
      localField: "book",
      foreignField: "_id",
      pipeline: [
        {
          $project: {
            _id: 0,
            title: 1,
            isbn: 1,
          },
        },
      ],
      as: "book",
    },
  },
  {
    $unwind: "$book",
  },
]);
