const { User } = require('../../models/user');
const { calcDailyRate } = require('../../helpers/formulas');
const findNotHealthyFood = require('../../helpers/findNotHealthyFood');
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
  const notHealthy = await findNotHealthyFood(blood);
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
    },
  });
};
module.exports = calculator;
