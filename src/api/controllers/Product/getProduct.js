import { request, response } from "express";
import productService from "../../../libs/services/Product";

export const getProduct = async (req = request, res = response) => {
  const { page = 1, limit = 10 } = await req.query;
  let offset = (page - 1) * limit;

  const totalCountProduct = await productService.totalDataProduct();

  const totalPages = Math.ceil(totalCountProduct / limit);

  const next = offset + limit < totalCountProduct;
  const prev = offset > 0;

  const result = await productService.getProducts(offset, limit);

  return res.status(200).json({
    status: true,
    message: "get product successfully",
    pagination: {
      total_pages: totalPages,
      limit: parseInt(limit),
      current_page: parseInt(page),
      next: next,
      prev: prev,
    },
    query: result,
  });
};
