const { Schema, model } = require('mongoose');

const productSchema = Schema({
  weight: {
    type: Number,
    default: 0,
  },
});

const Product = model('products', productSchema);

module.exports = Product;
