const varUser = require('./user');
const varDay = require('./day');
const Day = varDay.Day;
const User = varUser.User;
const Product = require('./product');
const Diary = require('./diary');
const joiSchema = {
  userAdd: varUser.joiSchema.userAdd,
  userLogin: varUser.joiSchema.userLogin,
  userUpdate: varUser.joiSchema.userUpdate,
  dayAdd: varDay.joiSchema.dayAdd,
};

module.exports = {
  Day,
  User,
  Product,
  Diary,
  joiSchema,
};
