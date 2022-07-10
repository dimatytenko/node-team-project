const { Product } = require('../../models');

const getAll = async (req, res) => {
  let products = [];

  if (!req.query.search) {
    products = await Product.find({});
  } else {
    const { search: searchString } = req.query;

    //* FULL TEXT SEARCH - пошук з індексами , шукає лише по окремих словах, а не по частинках слова
    products = await Product.find({
      $text: { $search: searchString },
    });

    if (products.length === 0) {
      //* PARTIAL TEXT SEARCH - пошук без індексів, але знаходить і частинки слова, і цілі слова (часткове співпадіння)
      products = await Product.find({
        'title.en': { $regex: searchString, $options: 'i' },
      }).limit(20);
    }
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
