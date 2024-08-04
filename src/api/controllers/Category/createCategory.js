import { request, response } from "express";
import CategoryValidation from "../../../validation/Category";
import categoryService from "../../../libs/services/Category";
import InvariantError from "../../../utils/exceptions/InvariantError";

export const createCategory = async (req = request, res = response) => {
  const { name } = await req.body;
  CategoryValidation.validatePayloadCategory({ name });

  const checkCategoryDuplicate = await categoryService.getCategoryByName(name);

  if (checkCategoryDuplicate) {
    throw new InvariantError("Category already exist!");
  }

  const newCategory = await categoryService.createCategory(name);

  return res.status(200).json({
    success: true,
    message: "Successfully create category!",
    query: {
      id: newCategory.id,
      name: newCategory.name,
    },
  });
};
