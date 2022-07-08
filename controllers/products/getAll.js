const { Product } = require('../../models');

const getAll = async (req, res, next) => {
  try {
    let products = [];

    if (!req.query.search) {
      products = await Product.find({});
    } else {
      const { search } = req.query;

      products = await Product.find({
        'title.en': { $regex: search, $options: 'i' }, //часткове співпадіння по рядку ${query} незалежно від регістру
      });
    }

    const result = products.map(product => ({
      product_title: product.title,
    }));

    res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        total: result.length,
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
