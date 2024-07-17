import { request, response } from "express";
import userService from "../../../libs/services/User";
import NotFoundError from "../../../utils/exceptions/NotFoundError";

export const deleteUsers = async (req = request, res = response) => {
  try {
    const { id } = await req.params;
    const checkUniqueId = await userService.getUserById(parseInt(id));

    if (!checkUniqueId) {
      throw new NotFoundError("Id not found!");
    }

    await userService.deleteUserById(parseInt(id));

    res.status(200).json({
      success: true,
      message: "Successfully delete users!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
