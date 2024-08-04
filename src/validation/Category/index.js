import InvariantError from "../../utils/exceptions/InvariantError";
import { categorySchema } from "./schema";

const CategoryValidation = {
  validatePayloadCategory(payload) {
    const { error } = categorySchema.validate(payload);
    if (error) {
      throw new InvariantError(error.details[0].message);
    }
  },
};

export default CategoryValidation;
