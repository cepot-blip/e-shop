import InvarianError from "../../utils/exceptions/InvariantError";
import {
  changePasswordSchema,
  createUsersSchema,
  loginUsersSchema,
  updateUsersSchema,
} from "./schema";

const UserValidation = {
  validatePayloadUser(payload) {
    const { error } = createUsersSchema.validate(payload);
    if (error) {
      throw new InvarianError(error.details[0].message);
    }
  },

  validateLoginUser(payload) {
    const { error } = loginUsersSchema.validate(payload);
    if (error) {
      throw new InvarianError(error.details[0].message);
    }
  },

  validateUpdateUser(payload) {
    const { error } = updateUsersSchema.validate(payload);
    if (error) {
      throw new InvarianError(error.details[0].message);
    }
  },

  validateChangePassword(payload) {
    const { error } = changePasswordSchema.validate(payload);
    if (error) {
      throw new InvarianError(error.details[0].message);
    }
  },
};

export default UserValidation;
