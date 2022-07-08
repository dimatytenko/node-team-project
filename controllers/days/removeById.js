const { Day } = require('../../models');
const { NotFound } = require('http-errors');

const removeDay = async (req, res, next) => {
  const { dayId } = req.params;
  const { _id: userId } = req.user;
  const result = await Day.findOneAndRemove({
    _id: dayId,
    user_id: userId,
  });
  if (!result) {
    throw NotFound;
  }

  res.status(200).json({
    status: 'success',
    code: 200,
    message: 'Product has been removed',
    data: result,
  });
};

module.exports = removeDay;
