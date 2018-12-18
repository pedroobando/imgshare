const ctrl = {};

ctrl.index = (req, res) => {
  // res.send('Index page home');
  res.render('index');
};

module.exports = ctrl;