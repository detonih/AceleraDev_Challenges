const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routes = require('../src/routes');

app.use(bodyParser.json())

app.use('/v1', routes)

const start = async (port = 8080) => {
  app.listen(port, function () {
    console.info('%s listening at port %s', app.name, port)
  })
}

const stop = () => {
  app.close(() => {
    console.info('App Stopped')
  })
}

module.exports = {
  app,
  start,
  stop
}
