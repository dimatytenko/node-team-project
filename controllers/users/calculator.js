const { User } = require('../../models/user');
const { calcDailyRate } = require('../../helpers/formulas');
const findNotHealthyFood = require('../../helpers/findNotHealthyFood');
const calculator = async (req, res) => {
  const { blood, height, age, weight_current, weight_desired } = req.body;
  const { _id, name } = req.user;
  await User.findByIdAndUpdate(
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
      dailyRate,
      user: {
        _id,
        name,
        blood,
        height,
        age,
        weight_current,
        weight_desired,
      },
      notHealthy,
    },
  });
};
module.exports = calculator;
