const express = require('express');

const router = express.Router();

const { products: ctrl } = require('../../controllers');

const { auth, ctrlWrapper } = require('../../middlewares');

router.get('/', auth, ctrlWrapper(ctrl.getAll));

module.exports = router;
