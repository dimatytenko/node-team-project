const express = require('express');
const router = express.Router();
const { schemaValidation } = require('../../middlewares');
const { public: ctrl } = require('../../controllers');
const { joiSchema } = require('../../models/user');
router.post(
  '/calculator',
  schemaValidation(joiSchema.userUpdate, 'Incorrect filling'),
  ctrl.calculator,
);

module.exports = router;
