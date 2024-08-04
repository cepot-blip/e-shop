import Joi from "joi";

const createProductSchema = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
    "string.base": "Nama produk harus berupa teks.",
    "string.min": "Nama produk harus memiliki setidaknya 3 karakter.",
    "string.max": "Nama produk tidak boleh lebih dari 100 karakter.",
    "any.required": "Nama produk wajib diisi.",
  }),
  description: Joi.string().max(255).allow(null, "").messages({
    "string.base": "Deskripsi produk harus berupa teks.",
    "string.max": "Deskripsi produk tidak boleh lebih dari 255 karakter.",
  }),
  price: Joi.number().positive().precision(2).required().messages({
    "number.base": "Harga harus berupa angka.",
    "number.positive": "Harga harus merupakan angka positif.",
    "number.precision":
      "Harga tidak boleh memiliki lebih dari dua angka desimal.",
    "any.required": "Harga wajib diisi.",
  }),
  categoryId: Joi.number().integer().required().messages({
    "number.base": "ID kategori harus berupa angka.",
    "number.integer": "ID kategori harus berupa bilangan bulat.",
    "any.required": "ID kategori wajib diisi.",
  }),
});

const updateProductSchema = Joi.object({
  id: Joi.number().integer().required().messages({
    "number.base": "ID produk harus berupa angka.",
    "number.integer": "ID produk harus berupa bilangan bulat.",
    "any.required": "ID produk wajib diisi.",
  }),
  name: Joi.string().min(3).max(100).messages({
    "string.base": "Nama produk harus berupa teks.",
    "string.min": "Nama produk harus memiliki setidaknya 3 karakter.",
    "string.max": "Nama produk tidak boleh lebih dari 100 karakter.",
  }),
  description: Joi.string().max(255).allow(null, "").messages({
    "string.base": "Deskripsi produk harus berupa teks.",
    "string.max": "Deskripsi produk tidak boleh lebih dari 255 karakter.",
  }),
  price: Joi.number().positive().precision(2).messages({
    "number.base": "Harga harus berupa angka.",
    "number.positive": "Harga harus merupakan angka positif.",
    "number.precision":
      "Harga tidak boleh memiliki lebih dari dua angka desimal.",
  }),
  categoryId: Joi.number().integer().messages({
    "number.base": "ID kategori harus berupa angka.",
    "number.integer": "ID kategori harus berupa bilangan bulat.",
  }),
});

export { createProductSchema, updateProductSchema };
