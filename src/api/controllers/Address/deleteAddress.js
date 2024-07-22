import { request, response } from "express";
import { addressService } from "../../../libs/services/Address";
import NotFoundError from "../../../utils/exceptions/NotFoundError";

export const deleteAddress = async (req = request, res = response) => {
  const { id } = parseInt(req.params);
  const checkAddress = await addressService.deleteAddress(id);
  if (!checkAddress) {
    throw new NotFoundError("Address not found!");
  }

  await addressService.deleteAddress(id);

  res.status(200).json({
    success: true,
    message: "Successfully delete address!",
  });
};
