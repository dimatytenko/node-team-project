const { Day } = require('../models');
const { formatDate, calcLeft, calcPercentOf } = require('../helpers/formulas');

const updDay = async ({
  date = formatDate(new Date()),
  user = {},
  addConsumed = 0,
}) => {
  //   console.log(date);
  //   console.log(user);
  //   console.log(addConsumed);

  const { _id: user_id, daily_rate } = user;

  const dayUserArr = await Day.find({
    date,
    user_id,
  });

  //   console.log(dayUserArr);

  let dayUser = {};

  if (dayUserArr.length == 0) {
    dayUser = await Day.create({ date, user_id });
  } else {
    dayUser = dayUserArr[0];
  }

  const { _id: dayId, consumed } = dayUser;

  const daySummary = await Day.findByIdAndUpdate(
    dayId,
    {
      daily_rate,
      left: calcLeft(daily_rate, consumed + addConsumed),
      consumed: consumed + addConsumed,
      percentage_of_normal: calcPercentOf(consumed + addConsumed, daily_rate),
    },
    {
      new: true,
    },
  );

  return daySummary;
};

module.exports = updDay;
