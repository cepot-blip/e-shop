import { request, response } from "express";
import { addressService } from "../../../libs/services/Address";

export const createAddress = async (req = request, res = response) => {
  const { userId, street, city, state, postalCode, country } = req.body;

  try {
    await addressService.createAddress(
      userId,
      street,
      city,
      state,
      postalCode,
      country
    );
    res.status(201).json({
      success: true,
      message: "Address created successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
