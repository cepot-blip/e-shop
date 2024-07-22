import { request, response } from "express";
import { addressService } from "../../../libs/services/Address";

export const getAddress = async (req = request, res = response) => {
  const result = await addressService.getAddress();

  return res.status(200).json({
    status: true,
    message: "Successfully get address!",
    query: result,
  });
};
