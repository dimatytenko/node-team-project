const registerUser = require('./register-user');
const loginUser = require('./login-user');
const logoutUser = require('./logout-user');
const getAllProducts = require('./getAll-products');
const addDiaryEntry = require('./addDiaryEntry');
const removeDiaryEntry = require('./removeDiaryEntry');
const countCaloriesPublic = require('./countCalories-public');
const countCaloriesPrivate = require('./countCalories-private');

module.exports = {
  paths: {
    '/users/register': { ...registerUser },
    '/users/login': { ...loginUser },
    '/users/logout': { ...logoutUser },
    '/users/calculator': { ...countCaloriesPrivate },
    '/products': { ...getAllProducts },
    '/days': { ...addDiaryEntry },
    '/days/:dayId': { ...removeDiaryEntry },
    '/public/calculator': { ...countCaloriesPublic },
  },
};
