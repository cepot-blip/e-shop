import { request, response } from "express";
import orderService from "../../../libs/services/Order";
import NotFoundError from "../../../utils/exceptions/NotFoundError";
import InvariantError from "../../../utils/exceptions/InvariantError";

export const updateOrder = async (req = request, res = response) => {
  const { id } = await req.params;
  const { userId, totalAmount, status, shippingAddressId } = await req.body;

  const checkOrderById = await orderService.updateOrderById();
  if (!checkOrderById) {
    throw new NotFoundError("Order not found. put valid id!");
  }

  await orderService.updateOrderById(parseInt(id))

};
