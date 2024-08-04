import { request, response } from "express";
import productService from "../../../libs/services/Product";
import categoryService from "../../../libs/services/Category";
import NotFoundError from "../../../utils/exceptions/NotFoundError";

export const createProduct = async (req = request, res = response) => {
  const { name, description, price, categoryId } = req.body;
  await productService.createProduct(name, description, price, categoryId);

  // const checkUniqueCategoryId = categoryService.getCategoryById(
  //   parseInt(categoryId)
  // );

  // if (!checkUniqueCategoryId) {
  //   throw new NotFoundError("Category id not found. put valid id!");
  // }

  res.status(200).json({
    success: true,
    message: "Product created successfully!",
  });
};
