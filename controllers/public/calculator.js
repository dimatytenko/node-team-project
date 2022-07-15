const { calcDailyRate } = require('../../helpers/formulas');

const findNotHealthyFood = require('../../helpers/findNotHealthyFood');

const getRandomArray = require('../../helpers/getRandomArray');

const LIMIT = 4;

const calculator = async (req, res) => {
  const { blood, height, age, weight_current, weight_desired } = req.body;
  const dailyRate = calcDailyRate(height, age, weight_desired, weight_current);

  const notHealthyArr = await findNotHealthyFood(blood);
  const notHealthy = getRandomArray(notHealthyArr, LIMIT);

  res.json({
    status: 'success',
    code: 200,
    data: {
      dailyRate,
      notHealthy,
    },
  });
};

module.exports = calculator;
