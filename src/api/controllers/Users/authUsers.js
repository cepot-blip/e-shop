import { request, response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cryptoJS from "crypto-js";
import AuthenticationError from "../../../utils/exceptions/AuthenticationError";
import userService from "../../../libs/services/User";

dotenv.config();

export const authUsers = async (req = request, res = response) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      throw new AuthenticationError("Token not found!");
    }

    const bearer = token.split(" ")[1];
    const decToken = cryptoJS.AES.decrypt(
      bearer,
      process.env.API_SECRET
    ).toString(cryptoJS.enc.Utf8);
    const verify = jwt.verify(decToken, process.env.API_SECRET);

    if (!verify) {
      throw new AuthenticationError(
        "Failed to verify token. Please login again!"
      );
    }

    if (verify.exp < Date.now() / 1000) {
      throw new AuthenticationError("Token expired!");
    }

    const getUserData = await userService.getUserById(verify.id);

    if (!getUserData) {
      throw new AuthenticationError("User not found!");
    }

    const { password, ...userData } = getUserData;

    return res.status(200).json({
      success: true,
      query: userData,
    });
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return res.status(401).json({
        success: false,
        message: error.message,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      details: error.message,
    });
  }
};
