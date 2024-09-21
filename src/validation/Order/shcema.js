import Joi from "joi";

const validStatuses = ["PENDING", "PROCESSING", "COMPLETED", "CANCELED"];

const orderSchema = Joi.object({
  userId: Joi.number().required().messages({
    "number.base": "User ID harus berupa angka!",
    "any.required": "User ID wajib diisi!",
  }),
  totalAmount: Joi.number().required().messages({
    "number.base": "Total Amount harus berupa angka!",
    "any.required": "Total Amount wajib diisi!",
  }),
  status: Joi.string()
    .valid(...validStatuses)
    .required()
    .messages({
      "string.base": "Status harus berupa teks!",
      "any.only": `Status harus salah satu dari: ${validStatuses.join(", ")}`,
      "any.required": "Status wajib diisi!",
    }),
  shippingAddressId: Joi.number().required().messages({
    "number.base": "Shipping Address ID harus berupa angka!",
    "any.required": "Shipping Address ID wajib diisi!",
  }),
  createdAt: Joi.date().optional().messages({
    "date.base": "Created At harus berupa tanggal!",
  }),
  updatedAt: Joi.date().optional().messages({
    "date.base": "Updated At harus berupa tanggal!",
  }),
});

export { orderSchema };
