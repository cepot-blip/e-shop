import { OrderModel } from "../../../models/Models";
import ClientError from "../../../utils/exceptions/ClientError";
import InvariantError from "../../../utils/exceptions/InvariantError";
import NotFoundError from "../../../utils/exceptions/NotFoundError";

class OrderService {
  #orderModel;

  constructor(OrderModel) {
    this.#orderModel = OrderModel;
  }

  async createOrder(userId, totalAmount, status, shippingAddressId) {
    try {
      return await this.#orderModel.create({
        data: {
          userId,
          totalAmount,
          status,
          shippingAddressId,
        },
      });
    } catch (error) {
      console.error("Error creating order:", error);
      throw new InvariantError("Failed to create order. Please try again!");
    }
  }

  async getOrders(skip, limit) {
    try {
      return await this.#orderModel.findMany({
        skip,
        take: limit,
        orderBy: { id: "desc" },
      });
    } catch (error) {
      throw new InvariantError("Failed to retrieve orders. Please try again.");
    }
  }

  async getOrderById(id) {
    try {
      const order = await this.#orderModel.findUnique({
        where: { id },
      });
      if (!order) {
        throw new NotFoundError("Order not found.");
      }
      return order;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new InvariantError(
        "Failed to retrieve order by ID. Please try again."
      );
    }
  }

  async updateOrderById(id, userId, totalAmount, status, shippingAddressId) {
    try {
      const order = await this.#orderModel.findUnique({ where: { id } });
      if (!order) {
        throw new NotFoundError("Order not found.");
      }
      await this.#orderModel.update({
        where: { id },
        data: { userId, totalAmount, status, shippingAddressId },
      });
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new ClientError("Failed to update order by ID. Please try again.");
    }
  }

  async deleteOrderById(id) {
    try {
      const order = await this.#orderModel.findUnique({ where: { id } });
      if (!order) {
        throw new NotFoundError("Order not found.");
      }
      return await this.#orderModel.delete({ where: { id } });
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new InvariantError(
        "Failed to delete order by ID. Please try again."
      );
    }
  }

  async totalDataOrder() {
    try {
      return await this.#orderModel.count();
    } catch (error) {
      throw new InvariantError("Failed to count orders. Please try again.");
    }
  }
}

const orderService = new OrderService(OrderModel);

export default orderService;
