import express from "express";
import { catchAsync } from "../../../utils";
import { createProduct } from "../../controllers/Product/createProduct";
import { getProduct } from "../../controllers/Product/getProduct";
import { updateProduct } from "../../controllers/Product/updateProduct";
import { deleteProduct } from "../../controllers/Product/deleteProduct";
import { getProductById } from "../../controllers/Product/getProductById";

const product_routes = express.Router();

product_routes.post("/product", catchAsync(createProduct));
product_routes.get("/product", catchAsync(getProduct));
product_routes.get("/product/:id", catchAsync(getProductById));
product_routes.put("/product/:id", catchAsync(updateProduct));
product_routes.delete("/product/:id", catchAsync(deleteProduct));

export default product_routes;
