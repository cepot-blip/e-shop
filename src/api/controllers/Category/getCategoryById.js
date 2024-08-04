import { request, response } from "express";
import categoryService from "../../../libs/services/Category";
import NotFoundError from "../../../utils/exceptions/NotFoundError";

export const getCategoryById = async (req = request, res = response) => {
  const { id } = req.params;
  const result = await categoryService.getCategoryById(parseInt(id));

  if (!result) {
    throw new NotFoundError("Category not found. put valid id!");
  }

  return res.status(200).json({
    success: true,
    message: "Successfully get category by id!",
    query: result,
  });
};
