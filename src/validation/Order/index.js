import InvariantError from "../../utils/exceptions/InvariantError";
import orderSchema from "./schema";

const OrderValidation = {
  validateOrderPayload(payload) {
    const { error } = orderSchema.validate(payload, { abortEarly: false });
    if (error) throw new InvariantError(error.message);
  },
};

export default OrderValidation;
