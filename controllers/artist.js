const routeTest = (req, res) => {
  return res.status(200).json({
    message: 'From Artist'
  });
};

export default {
  routeTest
};
