import { ProductModel } from "../../../models/Models";
import ClientError from "../../../utils/exceptions/ClientError";
import InvariantError from "../../../utils/exceptions/InvariantError";
import NotFoundError from "../../../utils/exceptions/NotFoundError";

class ProductService {
  #productModel;

  constructor(ProductModel) {
    this.#productModel = ProductModel;
  }

  async createProduct(name, description, price, categoryId) {
    try {
      return await this.#productModel.create({
        data: {
          name,
          description,
          price,
          categoryId,
        },
      });
    } catch (error) {
      console.error("Error creating product:", error);
      throw new InvariantError("Failed to create product. Please try again!");
    }
  }

  async getProducts(skip, limit) {
    try {
      return await this.#productModel.findMany({
        skip,
        take: limit,
        orderBy: { id: "desc" },
      });
    } catch (error) {
      throw new InvariantError(
        "Failed to retrieve products. Please try again."
      );
    }
  }

  async getProductById(id) {
    try {
      const product = await this.#productModel.findUnique({
        where: { id },
      });
      if (!product) {
        throw new NotFoundError("Product not found.");
      }
      return product;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new InvariantError(
        "Failed to retrieve product by ID. Please try again."
      );
    }
  }

  async updateProductById(id, name, description, price, categoryId) {
    try {
      const product = await this.#productModel.findUnique({ where: { id } });
      if (!product) {
        throw new NotFoundError("Product not found.");
      }
      await this.#productModel.update({
        where: { id },
        data: { name, description, price, categoryId },
      });
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new ClientError(
        "Failed to update product by ID. Please try again."
      );
    }
  }

  async deleteProductById(id) {
    try {
      const product = await this.#productModel.findUnique({ where: { id } });
      if (!product) {
        throw new NotFoundError("Product not found.");
      }
      return await this.#productModel.delete({ where: { id } });
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new InvariantError(
        "Failed to delete product by ID. Please try again."
      );
    }
  }

  async totalDataProduct() {
    try {
      return await this.#productModel.count();
    } catch (error) {
      throw new InvariantError("Failed to count products. Please try again.");
    }
  }
}

const productService = new ProductService(ProductModel);

export default productService;
