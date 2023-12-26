const routeTest = (req, res) => {
  return res.status(200).json({
    message: 'From Album'
  });
};

export default {
  routeTest
};
