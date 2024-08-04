import { request, response } from "express";
import productService from "../../../libs/services/Product";

export const getProductById = async (req = request, res = response) => {
  const { id } = await req.params;
  const result = await productService.getProductById(parseInt(id));

  res.status(200).json({
    success: true,
    message: result,
  });
};
