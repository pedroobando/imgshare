const ctrl = {};
const path = require('path');

ctrl.index = (req, res) => {
  res.send(`Index page image ${req.param('image_id')}`);
};

ctrl.create = (req, res) => {
  const extfile = path.extname(req.file.originalname).toLocaleLowerCase();
  console.log(req.file);
  res.send('work..!');
};

ctrl.like = (req, res) => {

};

ctrl.comment = (req, res) => {

};

ctrl.remove = (req, res) => {

};

module.exports = ctrl;