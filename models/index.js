const varUser = require('./user');
const varDay = require('./day');
const Day = varDay.Day;
const User = varUser.User;
const joiSchema = {
  userAdd: varUser.joiSchema.userAdd,
  userLogin: varUser.joiSchema.userLogin,
  dayAdd: varDay.joiSchema.dayAdd,
};

module.exports = {
  Day,
  User,
  joiSchema,
};