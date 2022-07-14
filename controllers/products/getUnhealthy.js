const getRandomArray = require('../../helpers/getRandomArray');

const findNotHealthyFood = require('../../helpers/findNotHealthyFood');

const getUnhealthy = async (req, res) => {
  const { blood } = req.user;

  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 20;
  const skipped = (page - 1) * limit;
  const skip = skipped < 0 ? 0 : skipped;

  let unhealthyProducts;
  let result;

  if (req?.query?.all === 'true') {
    unhealthyProducts = await findNotHealthyFood(blood);

    result = unhealthyProducts.map(product => ({
      product_id: product._id,
      product_title: product.title,
    }));
  } else {
    unhealthyProducts = await findNotHealthyFood(blood, skip);

    const unhealthyProductsRandom = getRandomArray(unhealthyProducts, limit);

    result = unhealthyProductsRandom.map(product => ({
      product_id: product._id,
      product_title: product.title,
    }));
  }

  res.status(200).json({
    status: 'success',
    code: 200,
    data: { total: result.length, unhealthyProducts: result },
  });
};

module.exports = getUnhealthy;
