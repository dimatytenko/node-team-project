const { User } = require('../../models/user');
const { calcDailyRate } = require('../../helpers/formulas');
const findNotHealthyFood = require('../../helpers/findNotHealthyFood');
const calculator = async (req, res) => {
  const { blood, height, age, weight_current, weight_desired } = req.body;
  const { _id } = req.user;
  const user = await User.findByIdAndUpdate(
    _id,
    {
      blood,
      height,
      age,
      weight_current,
      weight_desired,
    },
    { new: true },
  );
  const dailyRate = calcDailyRate(height, age, weight_desired, weight_current);

  const notHealthy = await findNotHealthyFood(blood);
  res.json({
    status: 'success',
    code: 200,
    data: {
      consumed: 0,
      left: 0,
      PercentOfNormal: 0,
      user,
      dailyRate,
      notHealthy,
    },
  });
};
module.exports = calculator;
