import { request, response } from "express";
import categoryService from "../../../libs/services/Category";
import NotFoundError from "../../../utils/exceptions/NotFoundError";

export const deleteCategory = async (req = request, res = response) => {
  const { id } = await req.params;
  const checkCategoryId = await categoryService.getCategoryById(parseInt(id));

  if (!checkCategoryId) {
    throw new NotFoundError("Category not found!");
  }

  await categoryService.deleteCategory(parseInt(id));

  return res.status(200).json({
    success: true,
    message: "Successfully delete category!",
  });
};
