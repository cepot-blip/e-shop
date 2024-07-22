import { request, response } from "express";
import { addressService } from "../../../libs/services/Address";
import NotFoundError from "../../../utils/exceptions/NotFoundError";
import AddressValidation from "../../../validation/Address";

export const updateAddress = async (req = request, res = response) => {
  const { id, userId, street, city, state, postalCode, country } =
    await req.body;

  AddressValidation.validatePayloadAddress({
    id,
    userId,
    street,
    city,
    state,
    postalCode,
    country,
  });

  const checkAddress = await addressService.updateAddress();
  if (!checkAddress) {
    throw new NotFoundError("Address not found!");
  }

  await addressService.updateAddress(
    parseInt(id),
    userId,
    street,
    city,
    state,
    postalCode,
    country
  );

  res.status(200).json({
    success: true,
    message: "Successfully update address!",
  });
};
