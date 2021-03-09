import * as Joi from 'joi';

export const catModel = Joi.object({
  name: Joi.string().alphanum().min(0).max(20).required(),
  age: Joi.number().min(1).max(100).required(),
  breed: Joi.string().min(1).max(20),
});
