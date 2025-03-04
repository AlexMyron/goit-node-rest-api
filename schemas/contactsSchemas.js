import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50).required(),
  email: Joi.string().trim().email().required(),
  phone: Joi.string()
    .trim()
    .pattern(/^\+?[0-9\s\-()]{7,20}$/)
    .required(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50),
  email: Joi.string().trim().email(),
  phone: Joi.string()
    .trim()
    .pattern(/^\+?[0-9\s\-()]{7,20}$/),
}).min(1);
