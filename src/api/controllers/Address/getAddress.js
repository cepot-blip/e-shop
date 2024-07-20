import { request, response } from "express";
import AddressService from "../../../libs/services/Address";

export const getAddres = async (req = request, res = response) => {
  const { page = 1, limit = 10 } = await req.query;
  let offset = (page - 1) * limit;

  const totalPages = Math.ceil(limit);

  const next = offset + limit;
  const prev = offset > 0;

  const result = await AddressService.getAddres(offset, limit);

  return res.status(200).json({
    status: true,
    message: "Successfully get address!",
    pagination: {
      total_pages: totalPages,
      limit: parseInt(limit),
      current_page: parseInt(page),
      next: next,
      prev: prev,
    },
    query: result,
  });
};
