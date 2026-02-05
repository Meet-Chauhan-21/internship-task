import Joi from "joi";

export const createUserValidation = Joi.object({
  firstname: Joi.string().min(2).required(),
  lastname: Joi.string().min(2).required(),

  email: Joi.string().email().required(),

  password: Joi.string().min(6).required(),

  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required(),

  gender: Joi.string().valid("male", "female", "other").required(),

  hobbies: Joi.array().items(Joi.string()).min(1).required(),

  course: Joi.string().required(),
});
