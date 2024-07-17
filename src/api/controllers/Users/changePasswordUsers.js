import { request, response } from "express";
import bcrypt from "bcryptjs";
import userService from "../../../libs/services/User";
import NotFoundError from "../../../utils/exceptions/NotFoundError";
import ClientError from "../../../utils/exceptions/ClientError";
import UserValidation from "../../../validation/Users";

const salt = bcrypt.genSaltSync(10);

export const changePasswordUsers = async (req = request, res = response) => {
  const { email, oldPass, newPass } = await req.body;
  UserValidation.validateChangePassword({ email, oldPass, newPass });

  const findUsers = await userService.getUserByEmail(email);

  if (!findUsers) {
    throw new NotFoundError("email not found!");
  }

  const compareOldPass = await bcrypt.compareSync(oldPass, findUsers.password);

  if (!compareOldPass) {
    throw new ClientError("incorect password!");
  }

  const hashNewPassword = await bcrypt.hashSync(newPass, salt);
  await userService.changePassword(email, hashNewPassword);

  res.status(200).json({
    success: true,
    message: "Successfully change password!",
  });
};
