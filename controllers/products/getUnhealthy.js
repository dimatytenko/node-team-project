const { Product } = require('../../models');

const getUnhealthy = async (req, res) => {
  const { blood } = req.user;

  const unhealthyProducts = await Product.find({
    ['groupBloodNotAllowed.' + blood]: true,
  });

  const result = unhealthyProducts.map(product => ({
    product_id: product._id,
    product_title: product.title,
  }));

  res.status(200).json({
    status: 'success',
    code: 200,
    data: { total: result.length, products: result },
  });
};

module.exports = getUnhealthy;
