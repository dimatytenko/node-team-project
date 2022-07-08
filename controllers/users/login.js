const { User } = require('../../models');

const createError = require('http-errors');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

require('dotenv').config();

const { TOKEN_KEY } = process.env;

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { id: user._id, email };
      const token = jwt.sign(payload, TOKEN_KEY, { expiresIn: '1d' });

      await User.findByIdAndUpdate(user._id, { token });

      return res.status(200).json({
        status: 'success',
        code: 200,
        data: {
          token,
          user: {
            name: user.name,
            email: user.email,
          },
        },
      });
    }
    throw createError(401, 'Invalid credentials');
  } catch (error) {
    next(error);
  }
};

module.exports = login;
