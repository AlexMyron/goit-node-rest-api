import Joi from 'joi';

export const addContactSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50).required(),
  email: Joi.string().trim().email().required(),
  phone: Joi.string()
    .trim()
    .pattern(/^\+?[0-9\s\-()]{7,20}$/)
    .required(),
  favorite: Joi.boolean().optional(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50).messages({
    'string.min': 'Name must be at least 2 characters long.',
    'string.max': 'Name cannot exceed 50 characters.',
    'string.base': 'Name must be a valid string.',
  }),
  email: Joi.string().trim().email().messages({
    'string.email': 'Email must be a valid email address.',
    'string.base': 'Email must be a string.',
  }),
  phone: Joi.string()
    .trim()
    .pattern(/^\+?[0-9\s\-()]{7,20}$/)
    .messages({
      'string.pattern.base':
        'Phone number must be between 7 and 20 characters and can contain digits, spaces, dashes, and parentheses.',
    }),
})
  .min(1)
  .messages({
    'object.min': 'Body must have at least one field',
  });
