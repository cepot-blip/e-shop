import { request, response } from "express";
import jwt from "jsonwebtoken";
import env from "dotenv";
import bcryptjs from "bcryptjs";
import UserValidation from "../../../validation/Users";
import userService from "../../../libs/services/User";
import InvarianError from "../../../utils/exceptions/InvariantError";

env.config();

const salt = bcryptjs.genSaltSync(10);

export const createUsers = async (req = request, res = response) => {
  const { username, email, password } = req.body;

  UserValidation.validatePayloadUser({
    username,
    email,
    password,
  });

  const checkUniqueEmail = await userService.getUserByEmail(email);

  if (checkUniqueEmail) {
    throw new InvarianError("Email Already Existed!");
  }

  const createUsers = await userService.createUser(
    email,
    bcryptjs.hashSync(password, salt),
    username
  );

  const token = jwt.sign(
    {
      app_name: process.env.APP_NAME,
      email: createUsers.email,
      username: createUsers.username,
    },
    process.env.API_SECRET
  );

  res.status(201).json({
    success: true,
    message: "Successfully create users!",
    token: token,
  });
};
