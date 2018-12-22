const ctrl = {};
const path = require('path');
const fs = require('fs-extra');
const md5 = require('md5');
const { randomNumber } = require('../helpers/libs');

// const Image = require('../models/image');
const { Image, Comment } = require('../models');

ctrl.index = async (req, res) => {
  const viewModel = { image: {}, comments: {}};

  const image = await Image.findOne({filename: {$regex: req.params.image_id}});
  if (image) {
    image.views = image.views + 1;
    await image.save();
    viewModel.image = image;
    viewModel.comments = await Comment.find({image_id: image._id});
    // const thesecomments = await Comment.find({image_id: image._id});

    // res.render('image', {image, comments: thesecomments});
    res.render('image', viewModel);
  } else {
    res.redirect('/');
  }
  // res.send(`Index page image ${req.param('image_id')}`);
  // console.log(`params: ${req.params.image_id}`)
  // res.render('image');
};

ctrl.create = async (req, res) => {
  const rutaImagenUpload = 'src/public/upload';

  let imgUrl = ''; //randomNumber();
  let imagescoll = [];
  do {
    imgUrl = randomNumber();
    imagescoll = await Image.find({ filename: imgUrl });
    // console.log(imagescoll);
  } while (imagescoll.length > 0);

  const imageTempPath = req.file.path;
  const extfile = path.extname(req.file.originalname).toLocaleLowerCase();
  const targetPath = path.resolve(`${rutaImagenUpload}/${imgUrl}${extfile}`);
  // console.log(imgUrl);
  // console.log(targetPath);
  // console.log(req.file);

  if (extfile === '.png' || extfile === '.jpg' || extfile === '.jpeg' || extfile === '.gif') {
    await fs.rename(imageTempPath, targetPath);
    const newImage = new Image({
      title: req.body.title,
      description: req.body.description,
      filename: imgUrl + extfile
    });
    const imageSaved = await newImage.save();
    // res.send(`Image ${imgUrl + extfile} save work...!`);
    res.redirect(`/images/${imgUrl}`);
    // console.log(newImage);
  } else {
    // elimina la imagen de /temp
    await fs.unlink(imageTempPath);
    res.status(500).json({error: 'Only Images are Allowed'});

  }
  // res.send('work..!');
};

ctrl.like = async (req, res) => {
  const image = await Image.findOne({filename: {$regex: req.params.image_id}});
  if (image) {
    image.likes = image.likes + 1;
    await image.save();
    res.json({likes: image.likes});
  } else {
    res.status(500).json({error: 'Internal Error, in like controller'});
  }
};

ctrl.comment = async (req, res) => {
  const image_id = req.params.image_id;
  const image = await Image.findOne({filename: {$regex: image_id}});
  if (image) {
    const newComment = new Comment(req.body);
    newComment.gravatar = md5(newComment.email);
    newComment.image_id = image._id;
    await newComment.save();
    res.redirect(`/images/${image.uniqueId}`);
    // console.log(newComment);
  } else {
    res.redirect('/');
  }
  // res.send('Comentario Enviado');
  // console.log(newComment);
  // console.log(req.body);

};

ctrl.remove = async (req, res) => {
  const image = await Image.findOne({filename: {$regex: req.params.image_id}});
  if (image) {
    await fs.unlink(path.resolve(`./src/public/upload/${image.filename}`));
    await Comment.deleteOne({image_id: image._id});
    await image.remove();
    res.json(true);
  }
};

module.exports = ctrl;
