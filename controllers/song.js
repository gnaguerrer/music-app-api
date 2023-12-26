const routeTest = (req, res) => {
  return res.status(200).json({
    message: 'From Song'
  });
};

module.exports = {
  routeTest
};
