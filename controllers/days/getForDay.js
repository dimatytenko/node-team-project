const { Day, Diary } = require('../../models');

const { BadRequest } = require('http-errors');

const getForDay = async (req, res) => {
  const { day: dateString } = req.params;
  const { _id: userId } = req.user;

  const [year, month, day] = dateString.split('-');

  if (!year || !month || !day || year.length < 4) {
    throw BadRequest('invalid date');
  }

  const searchForDay = await Day.findOne({
    $and: [{ user_id: userId }, { date: dateString }],
  });

  if (!searchForDay) {
    throw BadRequest(`no data for ${dateString}`);
  }

  const { _id: datyId } = searchForDay;

  const productsForDay = await Diary.find({
    $and: [{ user_id: userId }, { day_id: datyId }],
  });

  res.status(200).json({
    status: 'success',
    code: 200,
    data: { searchForDay, productsForDay },
  });
};

module.exports = getForDay;
