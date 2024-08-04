import { request, response } from "express";
import productService from "../../../libs/services/Product";
import NotFoundError from "../../../utils/exceptions/NotFoundError";

export const updateProduct = async (req = request, res = response) => {
  const { id } = await req.params;
  const { categoryId, name, description, price } = await req.body;

  const checkUniqueId = await productService.getProductById(parseInt(id));

  // const checkUniqueCategoryId = await

  if (!checkUniqueId) {
    throw new NotFoundError("Id not found!");
  }

  await productService.updateProductById(
    parseInt(id),
    categoryId,
    name,
    description,
    price
  );

  res.status(200).json({
    success: true,
    message: "successfully update product!",
  });
};
