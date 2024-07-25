import { AddressModel } from "../../../models/Models";

class AddressService {
  #AddressModel;

  constructor(AddressModel) {
    this.#AddressModel = AddressModel;
  }

  async createAddress(userId, street, city, state, postalCode, country) {
    await this.#AddressModel.create({
      userId,
      street,
      city,
      state,
      postalCode,
      country,
    });
  }

  async getAddress() {
    return await this.#AddressModel.findMany();
  }

  async getAddressById(id) {
    return await this.#AddressModel.findUnique({
      where: { id },
      // include: {
      //   orders: {
      //     select: {
      //       id: true,
      //       userId: true,
      //       totalAmount: true,
      //       status: true,
      //       shippingAddressId: true,
      //       orderItems: true,
      //       transaction: true,
      //     },
      //   },
      // },
    });
  }

  async updateAddress(userId, street, city, state, postalCode, country, id) {
    return await this.#AddressModel.update({
      where: { id },
      data: {
        id,
        userId,
        street,
        city,
        state,
        postalCode,
        country,
      },
    });
  }

  async deleteAddress(id) {
    return await this.#AddressModel.delete({ where: { id } });
  }
}

export const addressService = new AddressService(AddressModel);

export default AddressService;
