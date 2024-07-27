import Joi from "joi";

const createUsersSchema = Joi.object({
  username: Joi.string().min(3).max(30).messages({
    "string.base": "Username harus berupa teks.",
    "string.min": "Username harus memiliki setidaknya 3 karakter.",
    "string.max": "Username tidak boleh lebih dari 30 karakter.",
  }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "org", "edu"] },
    })
    .required()
    .messages({
      "string.email": "Email harus berupa email yang valid.",
      "any.required": "Email wajib diisi.",
    }),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .min(8)
    .required()
    .messages({
      "string.pattern.base":
        "Password harus terdiri dari 3-30 karakter dan hanya mengandung huruf dan angka.",
      "string.min": "Password harus memiliki setidaknya 8 karakter.",
      "any.required": "Password wajib diisi.",
    }),
});

const loginUsersSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "org", "edu"] },
    })
    .required()
    .messages({
      "string.email": "Email harus berupa email yang valid.",
      "any.required": "Email wajib diisi.",
    }),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .min(8)
    .required()
    .messages({
      "string.pattern.base":
        "Password harus terdiri dari 3-30 karakter dan hanya mengandung huruf dan angka.",
      "string.min": "Password harus memiliki setidaknya 8 karakter.",
      "any.required": "Password wajib diisi.",
    }),
});

const updateUsersSchema = Joi.object({
  id: Joi.number().required().messages({
    "number.base": "ID harus berupa angka.",
    "any.required": "ID wajib diisi.",
  }),
  username: Joi.string().min(3).max(30).messages({
    "string.base": "Username harus berupa teks.",
    "string.min": "Username harus memiliki setidaknya 3 karakter.",
    "string.max": "Username tidak boleh lebih dari 30 karakter.",
  }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "org", "edu"] },
    })
    .required()
    .messages({
      "string.email": "Email harus berupa email yang valid.",
      "any.required": "Email wajib diisi.",
    }),
});

const changePasswordSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "org", "edu"] },
    })
    .required()
    .messages({
      "string.email": "Email harus berupa email yang valid.",
      "any.required": "Email wajib diisi.",
    }),
  oldPass: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .min(8)
    .required()
    .messages({
      "string.pattern.base":
        "Password lama harus terdiri dari 3-30 karakter dan hanya mengandung huruf dan angka.",
      "string.min": "Password lama harus memiliki setidaknya 8 karakter.",
      "any.required": "Password lama wajib diisi.",
    }),
  newPass: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .min(8)
    .required()
    .messages({
      "string.pattern.base":
        "Password baru harus terdiri dari 3-30 karakter dan hanya mengandung huruf dan angka.",
      "string.min": "Password baru harus memiliki setidaknya 8 karakter.",
      "any.required": "Password baru wajib diisi.",
    }),
});

export {
  createUsersSchema,
  loginUsersSchema,
  updateUsersSchema,
  changePasswordSchema,
};
