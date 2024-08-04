import { request, response } from "express";
import categoryService from "../../../libs/services/Category";

export const getCategory = async (req = request, res = response) => {
  const result = await categoryService.getCategory();

  return res.status(200).json({
    success: true,
    message: "Successfully get category!",
    query: result,
  });
};
