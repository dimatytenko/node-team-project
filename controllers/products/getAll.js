const { Product } = require('../../models');

const getAll = async (req, res) => {
  let products = [];

  if (!req.query.search) {
    products = await Product.find({});
  } else {
    const { search } = req.query;
    const searchString = search.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'); //экранирование строки

    products = await Product.find({
      'title.en': { $regex: searchString, $options: 'i' },
    }).limit(50);
  }

  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      total: products.length,
      products,
    },
  });
};

module.exports = getAll;
