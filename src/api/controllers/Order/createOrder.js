import { request, response } from "express";
import orderService from "../../../libs/services/Order";

export const createOrder = async (req = request, res = response) => {
  const { userId, totalAmaout, status, shippingAddressId } = req.body;

  try {
    await orderService.createOrder(
      userId,
      totalAmaout,
      status,
      shippingAddressId
    );
    res.status(200).json({
      success: true,
      message: "Order created successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
