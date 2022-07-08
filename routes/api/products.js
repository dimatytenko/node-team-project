const express = require('express');

const router = express.Router();

const { products: ctrl } = require('../../controllers');

router.get('/', ctrl.getAll);

module.exports = router;
