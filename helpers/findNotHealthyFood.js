const { Product } = require('../models');
const MAX_SIZE = 4;
const findNotHealthyFood = async blood => {
  const allNotHealthy = await Product.find({
    'groupBloodNotAllowed[blood]': false,
  });
  const result = new Set();
  for (_ of Array.from({ length: allNotHealthy.length }, (_, i) => i)) {
    result.add(allNotHealthy[Math.floor(Math.random() * allNotHealthy.length)]);
    if (result.size === MAX_SIZE) {
      break;
    }
  }
  return [...result];
};
module.exports = findNotHealthyFood;
