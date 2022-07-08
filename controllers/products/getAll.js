const { Product } = require('../../models');

const getAll = async (req, res) => {
  let products = [];

  if (!req.query.search) {
    products = await Product.find({});
  } else {
    const { search } = req.query;
    products = await Product.find({
      'title.en': { $regex: search, $options: 'i' }, //часткове співпадіння по рядку ${query} незалежно від регістру
    });
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
