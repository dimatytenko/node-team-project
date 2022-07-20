const { Product, Diary } = require('../../models');
const { BadRequest, NotFound } = require('http-errors');
const { formatDate } = require('../../helpers/formulas');
const updDay = require('../../helpers/createAndUpdateDay');

const addDay = async (req, res, next) => {
  const { productId: productIdSearch, weight, date: dateString } = req.body;
  const { _id: userId } = req.user;
  let dateRequested;

  const [year, month, day] = dateString.split('-');

  if (
    !year ||
    !month ||
    !day ||
    year.length < 4 ||
    month.length > 2 ||
    day.length > 2
  ) {
    throw BadRequest('Bad request (the wrong date format)');
  }

  try {
    dateRequested = formatDate(new Date(dateString));
  } catch (error) {
    error.status = 400;
    error.message = 'Bad request (the wrong date format)';
    next(error);
  }

  const product = await Product.findById(productIdSearch);

  if (!product) {
    throw NotFound('Product not found');
  }

  const {
    _id: productId,
    calories: productCalories,
    weight: productWeight,
  } = product;

  const calories = Math.round((weight * productCalories) / productWeight);

  const daySummary = await updDay({
    date: dateRequested,
    user: req.user,
    addConsumed: calories,
  });

  const { _id: day_id } = daySummary;

  const result = await Diary.create({
    product_id: productId,
    day_id,
    user_id: userId,
    weight: Math.round(weight),
    calories,
  });

  const { _id: diaryId } = result;

  const addedProduct = await Diary.findById(diaryId).populate('product_id');

  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      addedProduct,
      summary: daySummary,
    },
  });
};

module.exports = addDay;
