const { Diary, Day } = require('../../models');
const { NotFound } = require('http-errors');
const mongoose = require('mongoose');
const { calcLeft, calcPercentOf } = require('../../helpers/formulas');

const removeDay = async (req, res, next) => {
  const { diaryId } = req.params;
  const { _id: userId } = req.user;

  console.log(diaryId);
  console.log(userId);

  if (!mongoose.Types.ObjectId.isValid(diaryId)) {
    throw NotFound();
  }

  console.log(diaryId);
  console.log(userId);

  const result = await Diary.findOneAndRemove({
    _id: diaryId,
    user_id: userId,
  });
  if (!result) {
    throw NotFound();
  }

  const { day_id: dayId, calories } = result;

  const dayUser = await Day.findById(dayId);

  const { daily_rate: dailyRrate, consumed } = dayUser;

  await Day.findByIdAndUpdate(
    dayId,
    {
      left: calcLeft(dailyRrate, consumed - calories),
      consumed: consumed - calories,
      percentage_of_normal: calcPercentOf(consumed - calories, dailyRrate),
    },
    {
      new: true,
    },
  );

  res.status(200).json({
    status: 'success',
    code: 200,
    message: 'Product has been removed',
    data: result,
  });
};

module.exports = removeDay;
