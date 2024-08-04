import { CategoryModel } from "../../../models/Models";
import ClientError from "../../../utils/exceptions/ClientError";
import InvariantError from "../../../utils/exceptions/InvariantError";
import NotFoundError from "../../../utils/exceptions/NotFoundError";

class CategoryService {
  #categoryModels;

  constructor(categoryModels) {
    this.#categoryModels = categoryModels;
  }

  async createCategory(name) {
    try {
      return await this.#categoryModels.create({ data: { name } });
    } catch (error) {
      throw new InvariantError("Failed to create category. Please try again!");
    }
  }

  async getCategory() {
    try {
      return await this.#categoryModels.findMany();
    } catch (error) {
      throw new InvariantError(
        "Failed to retrieve categories. Please try again!"
      );
    }
  }

  async getCategoryById(id) {
    try {
      const category = await this.#categoryModels.findUnique({ where: { id } });
      if (!category) {
        throw new NotFoundError("Category not found!");
      }
      return category;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new InvariantError(
        "Failed to retrieve category by ID. Please try again!"
      );
    }
  }

  async getCategoryByName(name) {
    try {
      const category = await this.#categoryModels.findFirst({
        where: { name },
      });
      if (!category) {
        throw new NotFoundError("Category not found!");
      }
      return category;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new InvariantError(
        "Failed to retrieve category by name. Please try again!"
      );
    }
  }

  async updateCategory(id, data) {
    try {
      const category = await this.#categoryModels.findUnique({ where: { id } });
      if (!category) {
        throw new NotFoundError("Category not found!");
      }
      await this.#categoryModels.update({ where: { id }, data });
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new ClientError(
        "Failed to update category. Please check your inputs and try again!"
      );
    }
  }

  async deleteCategory(id) {
    try {
      const category = await this.#categoryModels.findUnique({ where: { id } });
      if (!category) {
        throw new NotFoundError("Category not found!");
      }
      await this.#categoryModels.delete({ where: { id } });
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new InvariantError("Failed to delete category. Please try again!");
    }
  }
}

const categoryService = new CategoryService(CategoryModel);

export default categoryService;
