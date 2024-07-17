import { request, response } from "express";
import userService from "../../../libs/services/User";

export const getUsers = async (req = request, res = response) => {
  const { page = 1, limit = 10 } = await req.query;
  let skip = (page - 1) * limit;
  const { filter } = await req.body;
  const result = await userService.getUsers(skip, limit, filter);
  const count = await userService.totalDataUser();

  res.status(200).json({
    success: true,
    current_page: parseInt(page),
    total_page: Math.ceil(count / limit),
    total_data: count,
    query: result,
  });
};
