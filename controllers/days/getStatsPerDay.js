const { Day, Diary } = require('../../models');

const createError = require('http-errors');

const getStatsPerDay = async (req, res) => {
  const { day: dateString } = req.params;
  const { _id: userId } = req.user;

  const [year, month, day] = dateString.split('-');

  if (!year || !month || !day || year.length < 4) {
    throw createError(400, 'Invalid date');
  }

  const searchForDay = await Day.findOne({
    $and: [{ user_id: userId }, { date: dateString }],
  });

  if (!searchForDay) {
    throw createError(404, `No data for ${dateString}`);
  }

  const { _id: datyId } = searchForDay;

  const productsForDay = await Diary.find({
    $and: [{ user_id: userId }, { day_id: datyId }],
  }).populate('product_id', '_id, title');

  res.status(200).json({
    status: 'success',
    code: 200,
    data: { summary: searchForDay, productsForDay },
  });
};

module.exports = getStatsPerDay;
