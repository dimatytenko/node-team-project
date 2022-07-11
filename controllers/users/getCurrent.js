const getCurrent = async (req, res) => {
  const {
    email,
    name,
    blood,
    height,
    age,
    weight_current,
    weight_desired,
    daily_rate,
  } = req.user;

  res.status(200).json({
    status: 'success',
    code: 200,
    user: {
      email,
      name,
      blood,
      height,
      age,
      weight_current,
      weight_desired,
      daily_rate,
    },
  });
};

module.exports = getCurrent;
