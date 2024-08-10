import { request, response } from "express";
import productService from "../../../libs/services/Product";

export const createProduct = async (req = request, res = response) => {
  const { name, description, price, categoryId } = req.body;
  try {
    await productService.createProduct(name, description, price, categoryId);
    res.status(200).json({
      success: true,
      message: "Product created successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
