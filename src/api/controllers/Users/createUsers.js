import { request, response } from "express";
import jwt from "jsonwebtoken";
import env from "dotenv";
import userService from "../../../libs/services/User";
import UserValidation from "../../../validation/Users";
import bcryptjs from "bcryptjs";

env.config();

const salt = bcryptjs.genSaltSync(10);

export const createUsers = async (req = request, res = response) => {
  const { username, email, password } = req.body;

  UserValidation.validatePayloadUser({
    username,
    email,
    password,
  });

  const createUser = await userService.createUsers(
    email,
    bcryptjs.hashSync(password, salt),
    username
  );

  const token = jwt.sign(
    {
      app_name: process.env.APP_NAME,
      email: createUser.email,
      username: createUser.username,
    },
    process.env.API_SECRET
  );

  res.status(201).json({
    success: true,
    message: "Successfully create users!",
    token: token,
  });
};
