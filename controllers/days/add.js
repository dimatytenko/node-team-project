const { Day, Product, Diary } = require('../../models');

const { BadRequest, NotFound } = require('http-errors');
const { calcLeft, calcPercentOf } = require('../../helpers/formulas');

const addDay = async (req, res, next) => {
  const { productId: productIdSearch, weight, date: dateString } = req.body;
  const { _id: userId, daily_rate: dailyRrate } = req.user;
  let dateRequested;

  const [year, month, day] = dateString.split('-');

  if (!year || !month || !day || year.length < 4) {
    throw BadRequest('Bad request (the wrong date format)');
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

  try {
    dateRequested = new Date(dateString);
  } catch (error) {
    error.status = 400;
    error.message = 'Bad request (the wrong date format)';
    next(error);
  }

  // console.log(dateRequested);
  // console.log(userId);

  const dayUserArr = await Day.find({ date: dateRequested, user_id: userId });
  let dayUser = {};
  // console.log(dayUser);

  if (dayUserArr.length == 0) {
    dayUser = await Day.create({ date: dateRequested, user_id: userId });
    //  console.log('создали');
  } else {
    //  console.log('нашли');
    dayUser = dayUserArr[0];
  }

  // console.log(dayUser);

  const { _id: dayId, consumed } = dayUser;

  // console.log(dayUser);
  // console.log(dayId);

  // console.log(product);

  // console.log(weight);
  // console.log(productCalories);
  // console.log(productWeight);

  const calories = Math.round((weight * productCalories) / productWeight);

  // console.log(calories);

  const result = await Diary.create({
    product_id: productId,
    day_id: dayId,
    user_id: userId,
    weight,
    calories,
  });

  const { _id: diaryId } = result;

  const daySummary = await Day.findByIdAndUpdate(
    dayId,
    {
      daily_rate: dailyRrate,
      left: calcLeft(dailyRrate, consumed + calories),
      consumed: consumed + calories,
      percentage_of_normal: calcPercentOf(consumed + calories, dailyRrate),
    },
    {
      new: true,
    },
  );

  const addedProduct = await Diary.findById(diaryId).populate('product_id');

  // result._doc.calories = Math.round(
  //   (weight * product._doc.calories) / product._doc.weight,
  // );

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
