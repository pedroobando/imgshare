const ctrl = {};

const { Image } = require('../models');

ctrl.index = async (req, res) => {
  const images = await Image.find().sort({timestamp: -1});
  // res.send('Index page home');
  res.render('index', {images});
};

module.exports = ctrl;