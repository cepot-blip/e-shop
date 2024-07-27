import { AddressModel } from "../../../models/Models";
import InvariantError from "../../../utils/exceptions/InvariantError";
import NotFoundError from "../../../utils/exceptions/NotFoundError";

class AddressService {
  #addressModel;

  constructor(AddressModel) {
    this.#addressModel = AddressModel;
  }

  // CREATE ADDRESS
  async createAddress(userId, street, city, state, postalCode, country) {
    try {
      await this.#addressModel.create({
        data: {
          userId,
          street,
          city,
          state,
          postalCode,
          country,
        },
      });
    } catch (error) {
      console.error("Error creating address:", error);
      throw new InvariantError(
        "Failed to create address. Please check your inputs and try again."
      );
    }
  }

  // GET ADDRESS
  async getAddress() {
    try {
      return await this.#addressModel.findMany();
    } catch (error) {
      console.error("Error retrieving addresses:", error);
      throw new InvariantError(
        "Failed to retrieve addresses. Please try again."
      );
    }
  }

  // GET ADDRESS BY ID
  async getAddressById(id) {
    try {
      const address = await this.#addressModel.findUnique({
        where: { id },
      });
      if (!address) {
        throw new NotFoundError("Address not found.");
      }
      return address;
    } catch (error) {
      console.error("Error retrieving address by ID:", error);
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new InvariantError(
        "Failed to retrieve address by ID. Please try again."
      );
    }
  }

  // UPDATE ADDRESS
  async updateAddress(userId, street, city, state, postalCode, country, id) {
    try {
      const address = await this.#addressModel.findUnique({ where: { id } });
      if (!address) {
        throw new NotFoundError("Address not found.");
      }
      return await this.#addressModel.update({
        where: { id },
        data: {
          userId,
          street,
          city,
          state,
          postalCode,
          country,
        },
      });
    } catch (error) {
      console.error("Error updating address:", error);
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new InvariantError(
        "Failed to update address. Please check your inputs and try again."
      );
    }
  }

  // DELETE ADDRESS
  async deleteAddress(id) {
    try {
      const address = await this.#addressModel.findUnique({ where: { id } });
      if (!address) {
        throw new NotFoundError("Address not found.");
      }
      return await this.#addressModel.delete({ where: { id } });
    } catch (error) {
      console.error("Error deleting address:", error);
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new InvariantError("Failed to delete address. Please try again.");
    }
  }
}

export const addressService = new AddressService(AddressModel);

export default AddressService;
