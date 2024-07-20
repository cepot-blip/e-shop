import { AddressModel } from "../../../models/Models";

class AddressService {
  #AddressModel;

  constructor(AddressModel) {
    this.#AddressModel = AddressModel;
  }

  async createAddress(data) {
    await this.#AddressModel.create({ data });
  }

  async getAddress(skip, limit) {
    return await this.#AddressModel.findMany({
      skip: skip,
      take: limit,
      orderBy: { id: "desc" },
      include: {
        orders: {
          select: {
            id: true,
            userId: true,
            totalAmount: true,
            status: true,
            shippingAddressId: true,
            orderItems: true,
            transaction: true,
          },
        },
      },
    });
  }

  async getAddressById(id) {
    return await this.#AddressModel.findUnique({
      where: { id },
      include: {
        orders: {
          select: {
            id: true,
            userId: true,
            totalAmount: true,
            status: true,
            shippingAddressId: true,
            orderItems: true,
            transaction: true,
          },
        },
      },
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
