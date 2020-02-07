const express = require('express');
const app = express();
const movies = require('../imdb-movies.json');

const getRigthInfoMovies = () => {
  const getInfo = movies.map((curr, index, array) => {
  
    const {Director, Title} = curr;

    return {director: Director, movie: Title}
  });
  
  return getInfo;
}

const generateRandomMovie = () => {
  const iterator = Math.floor(getRigthInfoMovies().length * Math.random());

  return getRigthInfoMovies()[iterator];
}

const generateRandomMovieByDirector = (directorAsParam) => {
  
  const getInfoByDirector = getRigthInfoMovies().filter((elem, index, array) => {
    return elem.director.includes(directorAsParam)
  });

  const iterator = Math.floor(getInfoByDirector.length * Math.random());

  return getInfoByDirector[iterator];
}

app.get('/v1/movie', async (req, res, next) => {

  res.send(generateRandomMovie());
})

app.get('/v1/movie/:director', async (req, res, next) => {
  const getDirector = req.params.director;

  res.send(generateRandomMovieByDirector(getDirector));
})

const start = async (port = 8080) => {
  app.listen(port, function () {
    console.info('%s listening at port %s', app.name, port);
  })
}

const stop = () => {
  app.close(() => {
    console.info('App Stopped');
  })
}

module.exports = {
  app,
  start,
  stop
}
