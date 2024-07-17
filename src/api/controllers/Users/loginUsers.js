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

export const decryptToken = (hashToken) => {
  try {
    const bytes = CryptoJS.AES.decrypt(hashToken, process.env.API_SECRET);
    const originalToken = bytes.toString(CryptoJS.enc.Utf32);
    return originalToken;
  } catch (error) {
    throw new Error("Failed to decrypt token: " + error.message);
  }
};

export const getOriginalToken = async (req = request, res = response) => {
  try {
    const { hashToken } = req.body;

    if (!hashToken) {
      return res.status(400).json({
        success: false,
        message: "Hash token is required",
      });
    }

    const originalToken = decryptToken(hashToken);

    res.status(200).json({
      success: true,
      token: originalToken,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
