const { User } = require('../../models');

const createError = require('http-errors');

const bcrypt = require('bcrypt');

const register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      throw createError(409, 'This email address is already being used!');
    }

    encryptedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      email,
      name,
      password: encryptedPassword,
    });

    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
