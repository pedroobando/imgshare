// import { Comment, Image } from '../models';
const { Comment, Image } =  require('../models');

async function  imageCounter() {
  return await Image.countDocuments();
}

async function commentsCounter() {
  return await Comment.countDocuments();
}

async function imageTotalViewCounter() {
  const result = await Image.aggregate([{
    $group: {
      _id: '1',
      viewsTotal: { $sum: '$views'}
    }
  }]);
  return result[0].viewsTotal;
}

async function likesTotalCounter() {
  const result = await Image.aggregate([{
    $group: {
      _id: '1',
      likesTotal: { $sum: '$likes'}
    }
  }]);
  return result[0].likesTotal;
}

module.exports = async () => {
  const results = await Promise.all([
    imageCounter(),
    commentsCounter(),
    imageTotalViewCounter(),
    likesTotalCounter()
  ]);

  return {
    images: results[0],
    comments: results[1],
    views: results[2],
    likes: results[3]
  }
}
