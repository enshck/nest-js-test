import Joi from 'joi';

export default Joi.object({
  name: Joi.string().alphanum().min(0).max(20).required(),
  age: Joi.number().min(1).max(999999).required(),
  breed: Joi.string().min(1).max(20),
});
