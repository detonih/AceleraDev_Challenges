const express = require('express')
const router = express.Router()
const controller = require('../controllers/teams')
const isAuthorized = require('../middlewares/auth');

router.get('/', controller.getAll)

router.get('/:teamId', controller.getById)

router.post('/', isAuthorized, controller.create)

router.patch('/:teamId', isAuthorized, controller.update)

router.delete('/:teamId', isAuthorized, controller.delete)

module.exports = router
