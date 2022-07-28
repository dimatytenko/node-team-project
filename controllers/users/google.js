const queryString = require('query-string');
const axios = require('axios');
const { User } = require('../../models');
const jwt = require('jsonwebtoken');
const sendingMail = require('../../helpers/sendingMail');

const bcrypt = require('bcrypt');
const randomize = require('randomatic');

const googleAuth = async (req, res) => {
  const stringifiedParams = queryString.stringify({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: `${process.env.CLIENT_URL}/api/users/google-redirect`,
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ].join(' '),
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent',
  });
  return res.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`,
  );
};

const googleRedirect = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  const urlObj = new URL(fullUrl);
  const urlParams = queryString.parse(urlObj.search);
  const code = urlParams.code;
  if (urlParams?.error == 'access_denied') {
    return res.redirect(`${process.env.FRONTEND_URL}/login/`);
  }
  const tokenData = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: 'post',
    data: {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${process.env.CLIENT_URL}/api/users/google-redirect`,
      grant_type: 'authorization_code',
      code,
    },
  });
  const userData = await axios({
    url: 'https://www.googleapis.com/oauth2/v2/userinfo',
    method: 'get',
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`,
    },
  });

  const email = userData.data.email;
  const userName = userData.data.name;
  const userPassword = randomize('Aa0', 12);

  let user = await User.findOne({ email });

  if (!user) {
    const encryptedPassword = await bcrypt.hash(userPassword, 10);

    user = await User.create({
      email,
      name: userName,
      password: encryptedPassword,
    });

    const mailTxt = `You are wellcome to benefit from our services in the web application SlimMom!\n\rRegistration with Google was successfully confirmed.\n\rHere is your login information:\n\r\n\rEmail:\n\r${email}\n\rPassword:\n\r${userPassword}\n\r\n\rSincerely, SlimMom App team`;

    sendingMail({ mailRecipient: email, mailText: mailTxt });
  }

  const payload = { id: user._id, email };
  const token = jwt.sign(payload, process.env.TOKEN_KEY, { expiresIn: '1d' });

  await User.findByIdAndUpdate(user._id, { token });

  return res.redirect(
    `${process.env.FRONTEND_URL}/google-redirect/?token=${token}&name=${user.name}&email=${user.email}&blood=${user.blood}&height=${user.height}&age=${user.age}&weight_current=${user.weight_current}&weight_desired=${user.weight_desired}&daily_rate=${user.daily_rate}`,
  );
};
module.exports = { googleAuth, googleRedirect };
