import express from "express";
import rateLimit from "express-rate-limit";
import { catchAsync } from "../../../utils";
import { createUsers } from "../../controllers/Users/createUsers";
import {
  getOriginalToken,
  loginUsers,
} from "../../controllers/Users/loginUsers";
import { getUsers } from "../../controllers/Users/getUsers";
import { updateUsers } from "../../controllers/Users/updateUsers";
import { deleteUsers } from "../../controllers/Users/deleteUsers";

const users_routes = express.Router();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: "terlalu banyak menekan layar!",
});

users_routes.post("/create", catchAsync(createUsers));
users_routes.post("/login", limiter, catchAsync(loginUsers));
users_routes.get("/get", catchAsync(getUsers));
users_routes.put("/update", catchAsync(updateUsers));
users_routes.delete("/delete/:id", catchAsync(deleteUsers));
users_routes.post("/change-password");
users_routes.get("/auth");
users_routes.get("/getby-id/:id");
users_routes.post("/decrypt-token", getOriginalToken);

export default users_routes;
