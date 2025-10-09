import { request, response } from "express";
import orderService from "../../../libs/services/Order";
import NotFoundError from "../../../utils/exceptions/NotFoundError";

export const deleteOrder = async (req, res) => {
    const { id } = req.params;

    const checkOrderId = await orderService.getOrderById(parseInt(id));
    if (!checkOrderId) {
        throw new NotFoundError("Order not found!");
    }

    await orderService.deleteOrderById(parseInt(id))

    res.status(200).json({
        success : true,
        message : "Successfully delete order by id!"
    })

}