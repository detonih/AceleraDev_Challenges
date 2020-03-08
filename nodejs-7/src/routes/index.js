const express = require('express')
const router = express.Router()
const animals = require('./animals');

router.get('/', (req, res) => {
  res.json({
    animals: 'http://localhost:8080/v1/animals'
  })
})

router.use('/animals', animals);

module.exports = router