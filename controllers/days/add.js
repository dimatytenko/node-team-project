const { Day, Product } = require('../../models');

const { BadRequest } = require('http-errors');

const addDay = async (req, res, next) => {
  const { productId: productIdSearch, weight, date: dateString } = req.body;
  const { _id: userId } = req.user;
  let date;

  const [year, month, day] = dateString.split('-');

  const product = await Product.findById(productIdSearch);

  if (!product || !year || !month || !day || year.length < 4) {
    throw BadRequest();
  }

  const { _id: productId } = product;

  try {
    date = new Date(dateString);
  } catch (error) {
    error.status = 400;
    error.message = 'bad request';
    next(error);
  }

  const result = await Day.create({
    product_id: productId,
    user_id: userId,
    date,
    weight,
  });

  result._doc.calories = Math.round(
    (weight * product._doc.calories) / product._doc.weight,
  );

  res.status(201).json({
    status: 'success',
    code: 201,
    data: result,
  });
};

module.exports = addDay;
