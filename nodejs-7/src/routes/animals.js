const express = require('express');
const router = express.Router();
const {
  getAll,
  getById,
  create,
  update,
  destroy
} = require('../controller/animalsController');

router.get('/', getAll);

router.get('/:animalId', getById);

router.post('/', create);

router.patch('/:animalId', update);

router.delete('/:animalId', destroy);

module.exports = router;