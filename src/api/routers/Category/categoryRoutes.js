import express from "express";
import { catchAsync } from "../../../utils";
import { createCategory } from "../../controllers/Category/createCategory";
import { getCategory } from "../../controllers/Category/getCategory";
import { getCategoryById } from "../../controllers/Category/getCategoryById";
import { deleteCategory } from "../../controllers/Category/deleteCategory";
import { updateCategory } from "../../controllers/Category/updateCategory";

const category_routes = express.Router();

category_routes.post("/category", catchAsync(createCategory));
category_routes.get("/category", catchAsync(getCategory));
category_routes.get("/category/:id", catchAsync(getCategoryById));
category_routes.put("/category/:id", catchAsync(updateCategory));
category_routes.delete("/category/:id", catchAsync(deleteCategory));

export default category_routes;
