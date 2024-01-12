const Joi = require("joi");

module.exports.schemaProduct = Joi.object({
  product: Joi.object({
    p_name: Joi.string().required(),
    p_desc: Joi.string().required(),
    p_img: {
      link: Joi.string(),
      filename: Joi.string(),
    },
    p_qyt: Joi.string().required(),
    mrp: Joi.number().required(),
    p_exp: Joi.date().required(),
  }).required(),
});

module.exports.schemaReview = Joi.object({
  review: Joi.object({
    msg: Joi.string().required(),
    rating: Joi.number().required().min(1).max(5),
  }).required(),
});
