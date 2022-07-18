const register = require('./register');
const login = require('./login');
const logout = require('./logout');
const getCurrent = require('./getCurrent');
const calculator = require('./calculator');
const { googleAuth, googleRedirect } = require('./google');

module.exports = {
  register,
  login,
  logout,
  getCurrent,
  calculator,
  googleAuth,
  googleRedirect,
};
