const { Product } = require('../../models');
const { calcDailyRate } = require('../../helpers/formulas');
const calculator = async (req, res, next) => {
  try {
    const { blood, height, age, weight_current, weight_desired } = req.body;
    const dailyRate = calcDailyRate(
      height,
      age,
      weight_desired,
      weight_current,
    );
    const allNotHealthy = await Product.find({
      'groupBloodNotAllowed[blood]': false,
    });
    const result = new Set();
    for (item of Array.from({ length: allNotHealthy.length }, (_, i) => i)) {
      result.add(
        allNotHealthy[Math.floor(Math.random() * allNotHealthy.length)],
      );
      if (result.size === 4) {
        break;
      }
    }

    res.json({
      status: 'success',
      code: 200,
      data: {
        dailyRate,
        notHealthy: [...result],
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = calculator;
