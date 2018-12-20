const ctrl = {};
const path = require('path');
const fs = require('fs-extra');
const { randomNumber } = require('../helpers/libs');

ctrl.index = (req, res) => {
  res.send(`Index page image ${req.param('image_id')}`);
};

ctrl.create = async (req, res) => {
  const rutaImagenUpload = 'src/public/upload';
  const imgUrl = randomNumber();
  
  const imageTempPath = req.file.path;
  const extfile = path.extname(req.file.originalname).toLocaleLowerCase();
  const targetPath = path.resolve(`${rutaImagenUpload}/${imgUrl}${extfile}`);
  // console.log(imgUrl);
  // console.log(targetPath);
  // console.log(req.file);

  if (extfile === '.png' || extfile === '.jpg' || extfile === '.jpeg' || extfile === '.gif') {
    await fs.rename(imageTempPath, targetPath);
  }
  res.send('work..!');
};

ctrl.like = (req, res) => {

};

ctrl.comment = (req, res) => {

};

ctrl.remove = (req, res) => {

};

module.exports = ctrl;