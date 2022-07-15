const express = require('express');

const router = express.Router();

const { ctrlWrapper, auth, schemaValidation } = require('../../middlewares');
const { days: ctrl } = require('../../controllers');
const { joiSchema } = require('../../models');

router.get('/:day', auth, ctrlWrapper(ctrl.getStatsPerDay));

router.post(
  '/',
  auth,
  schemaValidation(joiSchema.dayAdd),
  ctrlWrapper(ctrl.addDay),
);

router.delete('/:diaryId', auth, ctrlWrapper(ctrl.removeDay));

module.exports = router;
