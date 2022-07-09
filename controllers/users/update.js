const { User } = require('../../models/user');
const update = async (req, res) => {
  const { blood, height, age, weight_current, weight_desired } = req.body;
  const { _id, name } = req.user;
  await User.findByIdAndUpdate(
    _id,
    {
      blood,
      height,
      age,
      weight_current,
      weight_desired,
    },
    { new: true },
  );

  res.json({
    status: 'success',
    code: 200,
    data: {
      user: {
        _id,
        name,
        blood,
        height,
        age,
        weight_current,
        weight_desired,
      },
    },
  });
};
module.exports = update;
