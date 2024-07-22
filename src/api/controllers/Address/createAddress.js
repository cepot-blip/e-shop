import { request, response } from "express";
import AddressValidation from "../../../validation/Address";
import { addressService } from "../../../libs/services/Address";

export const createAddress = async (req = request, res = response) => {
  try {
    const { userId, street, city, state, postalCode, country } = await req.body;

    AddressValidation.validatePayloadAddress({
      userId,
      street,
      city,
      state,
      postalCode,
      country,
    });

    const data = {
      userId,
      street,
      city,
      state,
      postalCode,
      country,
    };

    await addressService.createAddress(data);

    return res.status(201).json({
      success: true,
      message: "Successfully create address!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
