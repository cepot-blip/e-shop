import Joi from "joi";

const payloadSchema = Joi.object({
  userId: Joi.number().required(),
});

export default payloadSchema;
