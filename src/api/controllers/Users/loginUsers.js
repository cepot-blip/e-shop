import { request, response } from "express";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import CryptoJS from "crypto-js";
import dotenv from "dotenv";
import UserValidation from "../../../validation/Users";
import NotFoundError from "../../../utils/exceptions/NotFoundError";
import AuthenticationError from "../../../utils/exceptions/AuthenticationError";
import userService from "../../../libs/services/User";
dotenv.config();

const salt = bcryptjs.genSaltSync(10);

export const loginUsers = async (req = request, res = response) => {
  try {
    const { email, password } = req.body;
    UserValidation.validatePayloadUser({ email, password });

    const userCheck = await userService.getUserByEmail(email);

    if (!userCheck) {
      throw new NotFoundError("Email not found!");
    }

    const comparePassword = bcryptjs.compareSync(
      password,
      userCheck.password,
      salt
    );

    if (!comparePassword) {
      throw new AuthenticationError("Incorrect Password!");
    }

    const token = jwt.sign(
      {
        app_name: "e-shop",
        id: userCheck.id,
        email: userCheck.email,
      },
      process.env.API_SECRET,
      {
        expiresIn: "1d",
      }
    );

    const hashToken = CryptoJS.AES.encrypt(
      token,
      process.env.API_SECRET
    ).toString();

    res.status(200).json({
      success: true,
      token: hashToken,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
