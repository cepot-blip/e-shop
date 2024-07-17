import { request, response } from "express";
import UserValidation from "../../../validation/Users";
import userService from "../../../libs/services/User";
import NotFoundError from "../../../utils/exceptions/NotFoundError";

export const updateUsers = async (req = request, res = response) => {
  const { id, username, email } = await req.body;

  UserValidation.validateUpdateUser({
    id,
    username,
    email,
  });

  const checkUniqueId = await userService.getUserById(parseInt(id));

  if (!checkUniqueId) {
    throw new NotFoundError("User Not Found!");
  }

  await userService.updateUserById(id, username, email);

  res.status(200).json({
    success: true,
    message: "Successfully update users!",
  });
};
