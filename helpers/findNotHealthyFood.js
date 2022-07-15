const { Product } = require('../models');

const findNotHealthyFood = async (blood, skip = 0) => {
  const allNotHealthy = await Product.find(
    {
      ['groupBloodNotAllowed.' + blood]: true,
    },
    '',
    {
      skip,
    },
  );
  return allNotHealthy;
};

module.exports = findNotHealthyFood;
