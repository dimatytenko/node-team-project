const getCurrent = async (req, res) => {
  const { email, name } = req.user;

  res.status(200).json({
    status: 'success',
    code: 200,
    user: { email, name },
  });
};

module.exports = getCurrent;
