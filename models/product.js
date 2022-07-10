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

productSchema.index({ 'title.en': 'text', 'title.ua': 'text' });

const Product = model('product', productSchema);

module.exports = Product;
