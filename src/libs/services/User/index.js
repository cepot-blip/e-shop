import { UsersModel } from "../../../models/Models";

class UserService {
  #userModel;

  constructor(UsersModel) {
    this.#userModel = UsersModel;
  }

  async getUsers(skip, limit) {
    return await this.#userModel.findMany({
      skip: skip,
      take: limit,
      orderBy: { id: "desc" },
      include: {
        address: {
          select: {
            id: true,
            userId: true,
            street: true,
            city: true,
            state: true,
            postalCode: true,
            country: true,
          },
        },
      },
    });
  }

  async getUserById(id) {
    return await this.#userModel.findUnique({
      where: { id },
    });
  }

  async getUserByEmail(email) {
    return await this.#userModel.findUnique({
      where: { email },
    });
  }

  async getUserByCredentials(where) {
    return await this.#userModel.findUnique({ where });
  }

  async createUser(email, password, username) {
    return await this.#userModel.create({
      data: {
        username,
        email,
        password,
      },
    });
  }

  async updateUserById(id, email, username) {
    await this.#userModel.update({
      where: { id },
      data: { username, email },
    });
  }

  async deleteUserById(id) {
    return await this.#userModel.delete({ where: { id } });
  }

  async changePassword(where, password) {
    await this.#userModel.update({ where, data: password });
  }

  async totalDataUser() {
    return await this.#userModel.count();
  }
}

const userService = new UserService(UsersModel);

export default userService;
