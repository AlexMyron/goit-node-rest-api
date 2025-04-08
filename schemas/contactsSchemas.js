import Joi from 'joi';
import { emailRegex, phoneRegex } from '../constants/constants';

export const addContactSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50).required().label('Name').messages({
    'string.base': '{{#label}} must be a string.',
    'string.empty': '{{#label}} is required.',
    'string.min': '{{#label}} must be at least {#limit} characters long.',
    'string.max': '{{#label}} must not exceed {#limit} characters.',
    'any.required': '{{#label}} is required.',
  }),

  email: Joi.string()
    .trim()
    .pattern(emailRegex)
    .required()
    .label('Email')
    .messages({
      'string.base': '{{#label}} must be a string.',
      'string.email': '{{#label}} must be a valid email address.',
      'any.required': '{{#label}} is required.',
    }),

  phone: Joi.string()
    .trim()
    .pattern(phoneRegex)
    .required()
    .label('Phone number')
    .messages({
      'string.pattern.base':
        '{{#label}} must be a valid phone number (7-20 chars, digits, spaces, dashes, parentheses).',
      'any.required': '{{#label}} is required.',
    }),

  favorite: Joi.boolean().optional().label('Favorite').messages({
    'boolean.base': '{{#label}} must be true or false.',
  }),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50).label('Name').messages({
    'string.base': '{{#label}} must be a string.',
    'string.min': '{{#label}} must be at least {#limit} characters long.',
    'string.max': '{{#label}} must not exceed {#limit} characters.',
  }),

  email: Joi.string().trim().pattern(emailRegex).label('Email').messages({
    'string.base': '{{#label}} must be a string.',
    'string.email': '{{#label}} must be a valid email address.',
  }),

  phone: Joi.string()
    .trim()
    .pattern(phoneRegex)
    .label('Phone number')
    .messages({
      'string.pattern.base':
        '{{#label}} must be a valid phone number (7-20 chars, digits, spaces, dashes, parentheses).',
    }),

  favorite: Joi.boolean().optional().label('Favorite').messages({
    'boolean.base': '{{#label}} must be true or false.',
  }),
})
  .min(1)
  .messages({
    'object.min': 'At least one field must be provided for update.',
  });
