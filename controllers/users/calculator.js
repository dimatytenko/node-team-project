const { User } = require('../../models');

const { calcDailyRate, formatDate } = require('../../helpers/formulas');

const updDay = require('../../helpers/createAndUpdateDay');

const findNotHealthyFood = require('../../helpers/findNotHealthyFood');

const getRandomArray = require('../../helpers/getRandomArray');

const LIMIT = 4;

const calculator = async (req, res) => {
  const { blood, height, age, weight_current, weight_desired } = req.body;
  const { _id, name } = req.user;

  const daily_rate = calcDailyRate(height, age, weight_desired, weight_current);

  const updUser = await User.findByIdAndUpdate(
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

  req.user = updUser;

  const notHealthyArr = await findNotHealthyFood(blood);
  const notHealthy = getRandomArray(notHealthyArr, LIMIT);

  const today = formatDate(new Date());

  const daySummary = await updDay({ date: today, user: req.user });

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
