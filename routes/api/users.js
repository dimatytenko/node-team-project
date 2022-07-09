const express = require('express');

const router = express.Router();

const { users: ctrl } = require('../../controllers');

const { schemaValidation, auth, ctrlWrapper } = require('../../middlewares');

const {
  joiSchema: { userAdd, userLogin, userUpdate },
} = require('../../models');

router.post('/register', schemaValidation(userAdd), ctrl.register);

router.post('/login', schemaValidation(userLogin), ctrl.login);

router.post('/logout', auth, ctrl.logout);
router.patch(
  '/calculator',
  auth,
  schemaValidation(userUpdate),
  ctrlWrapper(ctrl.calculator),
);

module.exports = router;
