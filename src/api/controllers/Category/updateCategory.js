import { request, response } from "express";
import categoryService from "../../../libs/services/Category";
import NotFoundError from "../../../utils/exceptions/NotFoundError";
import CategoryValidation from "../../../validation/Category";
import InvariantError from "../../../utils/exceptions/InvariantError";

export const updateCategory = async (req = request, res = response) => {
  const { id } = await req.params;
  const { name } = await req.body;

  CategoryValidation.validatePayloadCategory({ name });

  const checkUniqueId = await categoryService.getCategoryById(parseInt(id));

  if (!checkUniqueId) {
    throw new NotFoundError("Category id not found. put valid id!");
  }

  const checkDuplicateCategory = await categoryService.getCategoryByName(name);

  if (checkDuplicateCategory) {
    throw new InvariantError("Categody already exist!");
  }

  await categoryService.updateCategory(id, { name });

  return res.status(200).json({
    success: true,
    message: "Successfully update category!",
  });
};
