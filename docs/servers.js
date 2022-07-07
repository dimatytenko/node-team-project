require('dotenv').config();

const { CLIENT_URL } = process.env;

module.exports = {
  servers: [
    {
      url: `${CLIENT_URL}/api`,
    },
  ],
};
