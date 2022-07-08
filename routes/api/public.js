const Joi = require('joi');
const express = require('express');
const router = express.Router();
const { schemaValidation } = require('../../middlewares');
const { public: ctrl } = require('../../controllers');
const joiSchema = Joi.object({
  height: Joi.number().positive().required(),
  age: Joi.number().positive().required(),
  currentWeight: Joi.number().positive().required(),
  desiredWeight: Joi.number().positive().required(),
  bloodType: Joi.number().positive().required(),
});
router.post(
  '/calculator',
  schemaValidation(joiSchema, 'Incorrect filling'),
  ctrl.calculator,
);

module.exports = router;
