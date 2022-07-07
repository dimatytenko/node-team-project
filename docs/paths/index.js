const registerUser = require('./register-user');
const loginUser = require('./login-user');
const logoutUser = require('./logout-user');
const getCurrentUser = require('./getCurrentUser');

module.exports = {
  paths: {
    '/users/register': { ...registerUser },
    '/users/login': { ...loginUser },
    '/users/logout': { ...logoutUser },
    '/users/current': { ...getCurrentUser },
  },
};
