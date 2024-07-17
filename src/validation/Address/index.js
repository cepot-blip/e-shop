import InvarianError from "../../utils/exceptions/InvariantError";
import payloadSchema from "./schema";

const AddressValidation = {
  validatePayloadAddress(payload) {
    const { error } = payloadSchema.validate(payload);
    if (error) throw new InvarianError(error.message);
  },
};

export default AddressValidation;
