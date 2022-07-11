const express = require('express');

const router = express.Router();

const { products: ctrl } = require('../../controllers');

const { auth, ctrlWrapper } = require('../../middlewares');

router.get('/', auth, ctrlWrapper(ctrl.getAll));

router.get('/unhealthy', auth, ctrlWrapper(ctrl.getUnhealthy));

module.exports = router;
