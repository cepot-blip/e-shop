import Joi from "joi";

const payloadSchema = Joi.object({
  userId: Joi.number().required().messages({
    "any.required": "userId is required!",
  }),
  street: Joi.string(),
  city: Joi.string(),
  state: Joi.string(),
  postalCode: Joi.string(),
  country: Joi.string(),
});

export default payloadSchema;
