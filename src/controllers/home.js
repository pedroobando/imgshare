const ctrl = {};

const { Image } = require('../models');
const sidebar = require('../helpers/sidebar');

ctrl.index = async (req, res) => {
  const images = await Image.find().sort({timestamp: -1});
  let viewModel = {images: []};
  viewModel.images = images;
  viewModel = await sidebar(viewModel);
  // res.send('Index page home');
  // res.render('index', {images});
  console.log(viewModel);
  console.log(viewModel.sidebar.comments[0]);
  // console.log(viewModel.sidebar.popular[0]);
  res.render('index', viewModel);
};

module.exports = ctrl;
