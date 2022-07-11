const { Day } = require('../../models');

const { BadRequest } = require('http-errors');

const getForDay = async (req, res, next) => {
  const { date: dateString } = req.body;
  const { _id: userId } = req.user;
  // const userId = '62c60c0cd34841581a4cc208';

  const searchForDay = await Day.find({
    $and: [{ user_id: userId }, { date: dateString }],
  });

  if (!searchForDay) {
    throw BadRequest();
  }

  res.status(200).json({
    status: 'success',
    code: 200,
    data: { searchForDay },
  });
};

module.exports = getForDay;
