import { UsersModel } from "../../../models/Models";
import ClientError from "../../../utils/exceptions/ClientError";
import InvariantError from "../../../utils/exceptions/InvariantError";
import NotFoundError from "../../../utils/exceptions/NotFoundError";

class UserService {
  #userModel;

  constructor(UsersModel) {
    this.#userModel = UsersModel;
  }

  async createUsers(email, password, username) {
    try {
      return await this.#userModel.create({
        data: {
          username,
          email,
          password,
        },
      });
    } catch (error) {
      throw new InvariantError("Failed to create user. Please try again.");
    }
  }

  async getUsers(skip, limit) {
    try {
      return await this.#userModel.findMany({
        skip,
        take: limit,
        orderBy: { id: "desc" },
        include: {
          address: {
            select: {
              id: true,
              street: true,
              city: true,
              state: true,
              postalCode: true,
              country: true,
            },
          },
        },
      });
    } catch (error) {
      throw new InvariantError("Failed to retrieve users. Please try again.");
    }
  }

  async getUserById(id) {
    try {
      const user = await this.#userModel.findUnique({
        where: { id },
      });
      if (!user) {
        throw new NotFoundError("User not found.");
      }
      return user;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new InvariantError(
        "Failed to retrieve user by ID. Please try again."
      );
    }
  }

  async getUserByEmail(email) {
    try {
      const user = await this.#userModel.findUnique({
        where: { email },
      });
      if (!user) {
        throw new NotFoundError("User not found.");
      }
      return user;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new InvariantError(
        "Failed to retrieve user by email. Please try again."
      );
    }
  }

  async getUserByCredentials(where) {
    try {
      const user = await this.#userModel.findUnique({ where });
      if (!user) {
        throw new NotFoundError("User not found.");
      }
      return user;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new InvariantError(
        "Failed to retrieve user by credentials. Please try again."
      );
    }
  }

  async updateUserById(id, email, username) {
    try {
      const user = await this.#userModel.findUnique({ where: { id } });
      if (!user) {
        throw new NotFoundError("User not found.");
      }
      await this.#userModel.update({
        where: { id },
        data: { username, email },
      });
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new ClientError("Failed to update user by ID. Please try again.");
    }
  }

  async deleteUserById(id) {
    try {
      const user = await this.#userModel.findUnique({ where: { id } });
      if (!user) {
        throw new NotFoundError("User not found.");
      }
      return await this.#userModel.delete({ where: { id } });
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new InvariantError(
        "Failed to delete user by ID. Please try again."
      );
    }
  }

  async changePassword(where, password) {
    try {
      const user = await this.#userModel.findUnique({ where });
      if (!user) {
        throw new NotFoundError("User not found.");
      }
      await this.#userModel.update({
        where,
        data: { password },
      });
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new ClientError(
        "Failed to update password. Please check your inputs and try again."
      );
    }
  }

  async totalDataUser() {
    try {
      return await this.#userModel.count();
    } catch (error) {
      throw new InvariantError("Failed to count users. Please try again.");
    }
  }
}

const userService = new UserService(UsersModel);

export default userService;
