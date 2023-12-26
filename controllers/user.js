const routeTest = (req, res) => {
  return res.status(200).json({
    message: 'From User'
  });
};

module.exports = {
  routeTest
};
