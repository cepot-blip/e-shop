import express from "express";
import rateLimit from "express-rate-limit";
import { catchAsync } from "../../../utils";
import { createUsers } from "../../controllers/Users/createUsers";
import { loginUsers } from "../../controllers/Users/loginUsers";
import { getUsers } from "../../controllers/Users/getUsers";
import { updateUsers } from "../../controllers/Users/updateUsers";
import { deleteUsers } from "../../controllers/Users/deleteUsers";
import { authUsers } from "../../controllers/Users/authUsers";
import { changePasswordUsers } from "../../controllers/Users/changePasswordUsers";
import { getUsersById } from "../../controllers/Users/getUserById";
import { authCheck } from "../../middlewares/authGuard";

const users_routes = express.Router();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: "pressing too much on the screen!",
});

users_routes.post("/create", catchAsync(createUsers));
users_routes.post("/login", limiter, catchAsync(loginUsers));
users_routes.get("/get", authCheck, catchAsync(getUsers));
users_routes.put("/update/:id", authCheck, catchAsync(updateUsers));
users_routes.delete("/delete/:id", authCheck, catchAsync(deleteUsers));
users_routes.get("/getby-id/:id", authCheck, catchAsync(getUsersById));
users_routes.put(
  "/change-password",
  authCheck,
  catchAsync(changePasswordUsers)
);
users_routes.get("/auth", catchAsync(authUsers));

export default users_routes;
