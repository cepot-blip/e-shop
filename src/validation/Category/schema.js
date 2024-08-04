import Joi from "joi";

const categorySchema = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
    "string.base": "Category harus berupa teks.",
    "string.min": "Category harus memiliki setidaknya 3 karakter.",
    "string.max": "Category tidak boleh lebih dari 100 karakter.",
  }),
});

export { categorySchema };
