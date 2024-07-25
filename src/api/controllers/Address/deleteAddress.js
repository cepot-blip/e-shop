import { request, response } from "express";
import { addressService } from "../../../libs/services/Address";
import NotFoundError from "../../../utils/exceptions/NotFoundError";

export const deleteAddress = async (req = request, res = response) => {
  const { id } = req.params;
  const checkAddress = await addressService.getAddressById(parseInt(id));
  if (!checkAddress) {
    throw new NotFoundError("Address not found!");
  }

  await addressService.deleteAddress(parseInt(id));

  res.status(200).json({
    success: true,
    message: "Successfully delete address!",
  });
};
