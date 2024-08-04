import { request, response } from "express";
import productService from "../../../libs/services/Product";
import NotFoundError from "../../../utils/exceptions/NotFoundError";

export const deleteProduct = async (req = request, res = response) => {
  const { id } = req.params;
  const checkProduct = await productService.deleteProductById(parseInt(id));
  if (!checkProduct) {
    throw new NotFoundError("Product not found!");
  }

  await productService.deleteProductById(parseInt(id));

  res.status(200).json({
    success: true,
    message: "delete product by id successfully!",
  });
};
