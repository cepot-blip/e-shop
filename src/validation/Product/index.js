import InvariantError from "../../utils/exceptions/InvariantError";
import {
  createProductSchema,
  updateProductSchema,
} from "./schema";

const ProductValidation = {
  validateCreateProduct(payload) {
    const { error } = createProductSchema.validate(payload);
    if (error) {
      throw new InvariantError(error.details[0].message);
    }
  },

  validateUpdateProduct(payload) {
    const { error } = updateProductSchema.validate(payload);
    if (error) {
      throw new InvariantError(error.details[0].message);
    }
  },
};

export default ProductValidation;
