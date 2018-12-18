const express = require('express');
const server = require('./server/config');
// database
require('./database');

const app = server(express());

// starting server
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});
