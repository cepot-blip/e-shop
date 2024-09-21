import { request, response } from "express";
import orderService from "../../../libs/services/Order";

export const getOrders = async (req = request, res = response) => {
  const result = await orderService.getOrders();

  return res.status(200).json({
    status: true,
    message: "Orders get successfully!",
    query: result,
  });
};
