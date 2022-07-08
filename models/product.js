const { Schema, model } = require('mongoose');

const productSchema = Schema({
  categories: [String],
  weight: Number,
  title: {
    en: String,
    ua: String,
  },
  calories: Number,
  groupBloodNotAllowed: Array,
});

const Product = model('product', productSchema);

module.exports = Product;
