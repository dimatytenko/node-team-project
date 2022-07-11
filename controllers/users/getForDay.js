const { Day } = require('../../models');

const { BadRequest } = require('http-errors');

const getForDay = async (req, res) => {
  const { day: dateString } = req.params;
  const { _id: userId } = req.user;

  const [year, month, day] = dateString.split('-');

  if (!year || !month || !day || year.length < 4) {
    throw BadRequest('invalid date');
  }

  const searchForDay = await Day.find({
    $and: [{ user_id: userId }, { date: dateString }],
  });

  if (searchForDay.length < 1) {
    throw BadRequest(`no data for ${dateString}`);
  }

  res.status(200).json({
    status: 'success',
    code: 200,
    data: { searchForDay },
  });
};

module.exports = getForDay;
