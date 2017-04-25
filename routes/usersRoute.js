const router = require('express').Router();
const usersController = require('./../controllers/usersController');

router.get('/login', usersController.getAllUsers);

module.exports = router