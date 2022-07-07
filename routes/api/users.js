const express = require('express');

const router = express.Router();

const { users: ctrl } = require('../../controllers');

const { schemaValidation, auth } = require('../../middlewares');

const {
  joiSchema: { userAdd, userLogin },
} = require('../../models');

router.post('/register', schemaValidation(userAdd), ctrl.register);

router.post('/login', schemaValidation(userLogin), ctrl.login);

router.post('/logout', auth, ctrl.logout);

module.exports = router;
