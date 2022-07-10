const express = require('express');

const router = express.Router();

const { users: ctrl } = require('../../controllers');

const { schemaValidation, auth, ctrlWrapper } = require('../../middlewares');

const {
  joiSchema: { userAdd, userLogin, userUpdate },
} = require('../../models');

router.post('/register', schemaValidation(userAdd), ctrlWrapper(ctrl.register));

router.post('/login', schemaValidation(userLogin), ctrlWrapper(ctrl.login));

router.post('/logout', auth, ctrlWrapper(ctrl.logout));

router.get('/current', auth, ctrlWrapper(ctrl.getCurrent));

router.patch(
  '/calculator',
  auth,
  schemaValidation(userUpdate),
  ctrlWrapper(ctrl.calculator),
);

module.exports = router;
