import { request, response } from "express";
import orderService from "../../../libs/services/Order";
import NotFoundError from "../../../utils/exceptions/NotFoundError";

export default async function deleteOrder(req = request, res = response) {
  const { id } = req.params;
  const result = await orderService.getOrderById(parseInt(id));

  if (!result) {
    throw new NotFoundError("Order not found. put valid id!");
  }

  return res.status(200).json({
    success: true,
    message: "Successfully get order by id!",
    query: result,
  });
}
