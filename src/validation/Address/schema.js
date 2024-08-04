import Joi from "joi";

const addressSchema = Joi.object({
  userId: Joi.number().required().messages({
    "number.base": "User ID harus berupa angka.",
    "any.required": "User ID wajib diisi.",
  }),
  street: Joi.string().required().messages({
    "string.base": "Street harus berupa teks.",
    "any.required": "Street wajib diisi.",
  }),
  city: Joi.string().required().messages({
    "string.base": "City harus berupa teks.",
    "any.required": "City wajib diisi.",
  }),
  state: Joi.string().required().messages({
    "string.base": "State harus berupa teks.",
    "any.required": "State wajib diisi.",
  }),
  postalCode: Joi.string()
    .pattern(new RegExp("^[0-9]{5}$"))
    .required()
    .messages({
      "string.base": "Postal Code harus berupa teks.",
      "string.pattern.base": "Postal Code harus terdiri dari 5 digit angka.",
      "any.required": "Postal Code wajib diisi.",
    }),
  country: Joi.string().required().messages({
    "string.base": "Country harus berupa teks.",
    "any.required": "Country wajib diisi.",
  }),
});

export { addressSchema };
