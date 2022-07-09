const express = require('express');
const router = express.Router();
const { schemaValidation, ctrlWrapper } = require('../../middlewares');
const { public: ctrl } = require('../../controllers');
const {
  joiSchema: { userUpdate },
} = require('../../models/user');
router.post(
  '/calculator',
  schemaValidation(userUpdate, 'Incorrect filling'),
  ctrlWrapper(ctrl.calculator),
);

module.exports = router;
