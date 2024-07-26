import { request, response } from "express";
import UserValidation from "../../../validation/Users";
import userService from "../../../libs/services/User";
import NotFoundError from "../../../utils/exceptions/NotFoundError";

export const updateUsers = async (req = request, res = response) => {
  const { id } = req.params;
  const { username, email } = await req.body;

  UserValidation.validateUpdateUser({
    id,
    email,
    username,
  });

  const checkUniqueId = await userService.getUserById(parseInt(id));

  if (!checkUniqueId) {
    throw new NotFoundError("User Not Found!");
  }

  const data = { email, username };

  await userService.updateUserById(parseInt(id), email, username);

  res.status(200).json({
    success: true,
    message: "Successfully update users!",
  });
};
