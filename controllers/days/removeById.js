const { Diary } = require('../../models');
const { NotFound } = require('http-errors');
const mongoose = require('mongoose');
const updDay = require('../../helpers/createAndUpdateDay');

const removeDay = async (req, res, next) => {
  const { diaryId } = req.params;
  const { _id: userId } = req.user;

  if (!mongoose.Types.ObjectId.isValid(diaryId)) {
    throw NotFound();
  }

  const result = await Diary.findOneAndRemove({
    _id: diaryId,
    user_id: userId,
  });
  if (!result) {
    throw NotFound();
  }

  const { calories } = result;

  const daySummary = await updDay({ user: req.user, addConsumed: -calories });

  res.status(200).json({
    status: 'success',
    code: 200,
    message: 'Product has been removed',
    data: {
      removedProduct: result,
      summary: daySummary,
    },
  });
};

module.exports = removeDay;
