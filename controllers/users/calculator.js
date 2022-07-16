const { User, Day } = require('../../models');

const {
  calcDailyRate,
  formatDate,
  calcLeft,
  calcPercentOf,
} = require('../../helpers/formulas');

const findNotHealthyFood = require('../../helpers/findNotHealthyFood');

const getRandomArray = require('../../helpers/getRandomArray');

const LIMIT = 4;

const calculator = async (req, res) => {
  const { blood, height, age, weight_current, weight_desired } = req.body;
  const { _id, name } = req.user;

  const daily_rate = calcDailyRate(height, age, weight_desired, weight_current);

  await User.findByIdAndUpdate(
    _id,
    {
      blood,
      height,
      age,
      weight_current,
      weight_desired,
      daily_rate,
    },
    { new: true },
  );

  const notHealthyArr = await findNotHealthyFood(blood);
  const notHealthy = getRandomArray(notHealthyArr, LIMIT);

  const today = formatDate(new Date());

  const dayUserArr = await Day.find({
    date: today,
    user_id: _id,
  });

  let dayUser = {};

  if (dayUserArr.length == 0) {
    dayUser = await Day.create({ date: today, user_id: _id });
  } else {
    dayUser = dayUserArr[0];
  }

  const { _id: dayId, consumed } = dayUser;

  const daySummary = await Day.findByIdAndUpdate(
    dayId,
    {
      daily_rate,
      left: calcLeft(daily_rate, consumed),
      consumed,
      percentage_of_normal: calcPercentOf(consumed, daily_rate),
    },
    {
      new: true,
    },
  );

  res.json({
    status: 'success',
    code: 200,
    data: {
      user: {
        _id,
        name,
        blood,
        height,
        age,
        weight_current,
        weight_desired,
        daily_rate,
      },
      notHealthy,
      summary: daySummary,
    },
  });
};
module.exports = calculator;
