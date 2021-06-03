import Joi = require("joi");
 export const BooksSchema = Joi.object({
  id: Joi.string().min(6).required(),
  name: Joi.string().min(3).required(),
  authour: Joi.string().min(3).required(),
});